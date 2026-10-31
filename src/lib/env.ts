import { z } from 'zod';

const schema = z.object({
  APP_ORIGIN: z.url().default('http://localhost:3000'),
  TRUST_PROXY: z.enum(['true', 'false']).default('false'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  XOBOARD_VERSION: z.string().min(1).default('1.0.0'),
  XOBOARD_APK_PATH: z.string().min(1).default('downloads/Xoboard.apk'),
  GITHUB_REPO: z
    .string()
    .regex(/^[A-Za-z0-9_.]+\/[A-Za-z0-9_.]+$/)
    .default('xodobyte/xoboard'),
  GITHUB_TOKEN: z.string().optional(),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60000),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(120),
  DOWNLOAD_RATE_LIMIT_MAX: z.coerce.number().int().positive().default(5),
  ABUSE_STRIKE_LIMIT: z.coerce.number().int().positive().default(10),
  ABUSE_WINDOW_MS: z.coerce.number().int().positive().default(600000),
  ABUSE_BLOCK_MS: z.coerce.number().int().positive().default(900000),
  MAX_BODY_BYTES: z.coerce.number().int().positive().default(10240),
  UPSTREAM_TIMEOUT_MS: z.coerce.number().int().positive().default(4000),
  UPSTREAM_RETRIES: z.coerce.number().int().min(0).max(3).default(2),
});

export type Env = z.infer<typeof schema>;

let cached: Env | undefined;

export function env(): Env {
  if (cached) return cached;
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const keys = parsed.error.issues.map((issue) => issue.path.join('.')).join(', ');
    throw new Error(`Invalid environment configuration for: ${keys}`);
  }
  cached = parsed.data;
  return cached;
}
