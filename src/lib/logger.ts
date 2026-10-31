import { env } from '@/lib/env';

type Level = 'debug' | 'info' | 'warn' | 'error';
type Context = Record<string, unknown>;

const rank: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 };
const sensitiveKey = /pass|secret|token|cookie|authorization|credential|session|apikey|api_key/i;
const maxDepth = 5;

function sanitize(value: unknown, depth: number): unknown {
  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack,
      cause: value.cause === undefined ? undefined : sanitize(value.cause, depth + 1),
    };
  }
  if (depth >= maxDepth) return '[depth limit reached]';
  if (Array.isArray(value)) return value.slice(0, 50).map((item) => sanitize(item, depth + 1));
  if (value !== null && typeof value === 'object') {
    const out: Context = {};
    for (const [key, item] of Object.entries(value)) {
      out[key] = sensitiveKey.test(key) ? '[redacted]' : sanitize(item, depth + 1);
    }
    return out;
  }
  if (typeof value === 'string') {
    return value.length > 500 ? `${value.slice(0, 500)}...[truncated]` : value;
  }
  return value;
}

const baseStartTime = Date.now();

function getLogTimestamp(): string {
  try {
    return new Date(baseStartTime + performance.now()).toISOString();
  } catch {
    return '1970-01-01T00:00:00.000Z';
  }
}

function write(level: Level, message: string, context: Context) {
  if (rank[level] < rank[env().LOG_LEVEL]) return;
  const record = {
    time: getLogTimestamp(),
    level,
    service: 'xoboard-web',
    pid: process.pid,
    message,
    ...(sanitize(context, 0) as Context),
  };
  const line = `${JSON.stringify(record)}\n`;
  if (rank[level] >= rank.warn) {
    process.stderr.write(line);
  } else {
    process.stdout.write(line);
  }
}

export const logger = {
  debug: (message: string, context: Context = {}) => write('debug', message, context),
  info: (message: string, context: Context = {}) => write('info', message, context),
  warn: (message: string, context: Context = {}) => write('warn', message, context),
  error: (message: string, context: Context = {}) => write('error', message, context),
  audit: (action: string, context: Context = {}) =>
    write('info', 'audit', { category: 'audit', action, ...context }),
};
