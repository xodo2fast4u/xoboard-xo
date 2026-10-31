type Bucket = { count: number; resetAt: number };
type Strike = { count: number; resetAt: number; blockedUntil: number };

const MAX_KEYS = 50_000;
const buckets = new Map<string, Bucket>();
const strikes = new Map<string, Strike>();

function trim<T extends { resetAt: number }>(store: Map<string, T>, now: number) {
  if (store.size < MAX_KEYS) return;
  for (const [key, entry] of store) {
    if (entry.resetAt <= now) store.delete(key);
  }
  if (store.size >= MAX_KEYS) store.clear();
}

export type RateResult = { allowed: boolean; limit: number; remaining: number; resetAt: number };

export function consume(scope: string, key: string, limit: number, windowMs: number): RateResult {
  const now = Date.now();
  const id = `${scope}:${key}`;
  trim(buckets, now);
  const existing = buckets.get(id);
  const bucket =
    existing && existing.resetAt > now ? existing : { count: 0, resetAt: now + windowMs };
  bucket.count += 1;
  buckets.set(id, bucket);
  return {
    allowed: bucket.count <= limit,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    resetAt: bucket.resetAt,
  };
}

export function blockedUntil(key: string): number {
  const entry = strikes.get(key);
  if (!entry || entry.blockedUntil <= Date.now()) return 0;
  return entry.blockedUntil;
}

export function recordStrike(
  key: string,
  threshold: number,
  windowMs: number,
  blockMs: number,
): number {
  const now = Date.now();
  trim(strikes, now);
  const existing = strikes.get(key);
  const entry =
    existing && existing.resetAt > now
      ? existing
      : { count: 0, resetAt: now + windowMs, blockedUntil: 0 };
  entry.count += 1;
  if (entry.count >= threshold) entry.blockedUntil = now + blockMs;
  strikes.set(key, entry);
  return entry.blockedUntil;
}
