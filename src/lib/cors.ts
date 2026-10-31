import { env } from '@/lib/env';

export function allowedOrigin(origin: string | null): string | null {
  if (!origin) return null;
  return origin === env().APP_ORIGIN ? origin : null;
}

export function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = allowedOrigin(origin);
  if (!allowed) return { Vary: 'Origin' };
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '600',
    Vary: 'Origin',
  };
}
