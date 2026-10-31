import { getApkInfo } from '@/lib/apk';
import { withApi, json } from '@/lib/api';
import { fetchRepoStats } from '@/lib/github';

export const GET = withApi('stats.get', async (_request, ctx) => {
  const [repo, apk] = await Promise.all([fetchRepoStats(ctx.requestId), getApkInfo()]);
  return json(
    {
      data: {
        repository: repo,
        release: apk.available
          ? { version: apk.version, sizeBytes: apk.sizeBytes, available: true }
          : { version: apk.version, available: false },
      },
    },
    200,
    { 'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400' },
  );
});
