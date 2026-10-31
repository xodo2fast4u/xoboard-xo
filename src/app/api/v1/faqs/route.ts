import { withApi, json } from '@/lib/api';
import { faqs } from '@/lib/faqs';
import { faqQuerySchema, parseQuery } from '@/lib/validation';

export const GET = withApi('faqs.list', async (request) => {
  const query = parseQuery(faqQuerySchema, new URL(request.url).searchParams);
  const needle = query.q?.toLowerCase();
  const direction = query.order === 'asc' ? 1 : -1;

  const filtered = faqs
    .filter((faq) => !query.category || faq.category === query.category)
    .filter(
      (faq) =>
        !needle ||
        faq.question.toLowerCase().includes(needle) ||
        faq.answer.toLowerCase().includes(needle),
    )
    .sort((a, b) =>
      query.sort === 'question'
        ? direction * a.question.localeCompare(b.question)
        : direction * (a.position - b.position),
    );

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / query.limit));
  const start = (query.page - 1) * query.limit;
  const data = filtered
    .slice(start, start + query.limit)
    .map(({ id, category, question, answer }) => ({ id, category, question, answer }));

  return json({
    data,
    meta: {
      page: query.page,
      limit: query.limit,
      total,
      totalPages,
      sort: query.sort,
      order: query.order,
    },
  });
});
