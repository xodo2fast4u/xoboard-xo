import { NextResponse, type NextRequest } from 'next/server';
import { allowedOrigin, corsHeaders } from '@/lib/cors';
import { getClientIp } from '@/lib/clientip';
import { env } from '@/lib/env';
import { AppError, problemResponse, problems, toProblem } from '@/lib/errors';
import { logger } from '@/lib/logger';
import { blockedUntil, consume, recordStrike } from '@/lib/ratelimit';

const scannerPattern =
  /sqlmap|nikto|nmap|masscan|acunetix|nessus|dirbuster|gobuster|wpscan|nuclei/i;
const apiMethods = ['GET', 'HEAD', 'OPTIONS'];
const strikeCodes = new Set([
  'client_rejected',
  'client_identity_missing',
  'origin_not_allowed',
  'rate_limited',
]);

export function proxy(request: NextRequest) {
  const config = env();
  const requestId = crypto.randomUUID();
  const { pathname } = request.nextUrl;
  const ip = getClientIp(request.headers);
  const origin = request.headers.get('origin');
  const userAgent = (request.headers.get('user-agent') ?? '').slice(0, 200);
  const isApi = pathname.startsWith('/api/');
  const isDownload = pathname.startsWith('/api/v1/downloads/');

  const forwardHeaders = new Headers(request.headers);
  forwardHeaders.set('x-request-id', requestId);

  const protocol =
    request.headers.get('x-forwarded-proto') ?? request.nextUrl.protocol.replace(':', '');
  if (config.APP_ORIGIN.startsWith('https://') && protocol !== 'https') {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    const redirect = NextResponse.redirect(url, 308);
    redirect.headers.set('X-Request-Id', requestId);
    return redirect;
  }

  try {
    if (isApi) {
      if (!apiMethods.includes(request.method)) {
        throw new AppError(problems.methodNotAllowed, {
          headers: { Allow: apiMethods.join(', ') },
        });
      }
      if (scannerPattern.test(userAgent)) throw new AppError(problems.suspiciousClient);
      if (!userAgent) throw new AppError(problems.missingUserAgent);
      if (origin && !allowedOrigin(origin)) throw new AppError(problems.originNotAllowed);
      const declaredBytes = Number(request.headers.get('content-length') ?? 0);
      if (!Number.isFinite(declaredBytes) || declaredBytes > config.MAX_BODY_BYTES) {
        throw new AppError(problems.payloadTooLarge);
      }
      if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
          status: 204,
          headers: { ...corsHeaders(origin), 'X-Request-Id': requestId },
        });
      }
    }

    const blockedFor = blockedUntil(ip);
    if (blockedFor) {
      const seconds = Math.ceil((blockedFor - Date.now()) / 1000);
      throw new AppError(problems.blocked(seconds), {
        headers: { 'Retry-After': String(seconds) },
      });
    }

    const scope = isDownload ? 'downloads' : isApi ? 'api' : 'pages';
    const limit = isDownload ? config.DOWNLOAD_RATE_LIMIT_MAX : config.RATE_LIMIT_MAX;
    const rate = consume(scope, ip, limit, config.RATE_LIMIT_WINDOW_MS);
    const resetSeconds = Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000));
    const rateHeaders = {
      'RateLimit-Limit': String(rate.limit),
      'RateLimit-Remaining': String(rate.remaining),
      'RateLimit-Reset': String(resetSeconds),
    };
    if (!rate.allowed) {
      throw new AppError(problems.rateLimited(resetSeconds), {
        headers: { ...rateHeaders, 'Retry-After': String(resetSeconds) },
      });
    }

    const response = NextResponse.next({ request: { headers: forwardHeaders } });
    const extra = isApi ? { ...corsHeaders(origin), ...rateHeaders } : rateHeaders;
    for (const [key, value] of Object.entries({ ...extra, 'X-Request-Id': requestId })) {
      response.headers.set(key, value);
    }
    return response;
  } catch (error) {
    const problem = toProblem(error);
    const headers = error instanceof AppError ? error.headers : {};

    if (strikeCodes.has(problem.code)) {
      recordStrike(ip, config.ABUSE_STRIKE_LIMIT, config.ABUSE_WINDOW_MS, config.ABUSE_BLOCK_MS);
      logger.audit('security.request.rejected', {
        requestId,
        ip,
        method: request.method,
        path: pathname,
        userAgent,
        code: problem.code,
        status: problem.status,
      });
    } else {
      logger.warn('proxy.request.rejected', {
        requestId,
        ip,
        method: request.method,
        path: pathname,
        userAgent,
        code: problem.code,
        status: problem.status,
      });
    }

    return problemResponse(problem, requestId, headers);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
