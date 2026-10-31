import { env } from '@/lib/env';

const maxIpLength = 45;

export function getClientIp(headers: Headers): string {
  if (env().TRUST_PROXY === 'true') {
    const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (forwarded && forwarded.length <= maxIpLength) return forwarded;
    const real = headers.get('x-real-ip')?.trim();
    if (real && real.length <= maxIpLength) return real;
  }
  return 'unknown';
}
