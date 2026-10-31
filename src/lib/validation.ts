import { z } from 'zod';
import { AppError, problems } from '@/lib/errors';

export const faqCategories = ['general', 'install', 'privacy', 'customization'] as const;

export const faqQuerySchema = z.object({
  category: z.enum(faqCategories).optional(),
  q: z.string().trim().max(100).optional(),
  sort: z.enum(['position', 'question']).default('position'),
  order: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

export function parseQuery<T extends z.ZodType>(schema: T, params: URLSearchParams): z.infer<T> {
  const result = schema.safeParse(Object.fromEntries(params.entries()));
  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join('.') || 'request'} ${issue.message.toLowerCase()}`)
      .join('; ');
    throw new AppError(problems.invalidInput(details));
  }
  return result.data;
}
