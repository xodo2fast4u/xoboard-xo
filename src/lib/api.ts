import { getClientIp } from '@/lib/clientip';
import { AppError, problemResponse, toProblem } from '@/lib/errors';
import { logger } from '@/lib/logger';

export type ApiContext = { requestId: string; ip: string; route: string };

export function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });
}

export function withApi(
  route: string,
  handler: (request: Request, ctx: ApiContext) => Promise<Response>,
) {
  return async function apiRoute(request: Request): Promise<Response> {
    const started = performance.now();
    const requestId = request.headers.get('x-request-id') ?? crypto.randomUUID();
    const url = new URL(request.url);
    const ip = getClientIp(request.headers);
    const base = {
      requestId,
      route,
      method: request.method,
      path: url.pathname,
      query: url.search.slice(0, 300),
      ip,
      userAgent: (request.headers.get('user-agent') ?? 'none').slice(0, 200),
    };

    try {
      const response = await handler(request, { requestId, ip, route });
      logger.info('request.completed', {
        ...base,
        status: response.status,
        durationMs: Math.round(performance.now() - started),
      });
      response.headers.set('X-Request-Id', requestId);
      return response;
    } catch (error) {
      const problem = toProblem(error);
      const log = problem.status >= 500 ? logger.error : logger.warn;
      log('request.failed', {
        ...base,
        status: problem.status,
        code: problem.code,
        durationMs: Math.round(performance.now() - started),
        error,
      });
      return problemResponse(problem, requestId, error instanceof AppError ? error.headers : {});
    }
  };
}
