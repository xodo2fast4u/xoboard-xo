import { getApkInfo } from '@/lib/apk';
import { fetchRepoStats, type RepoStats } from '@/lib/github';
import { logger } from '@/lib/logger';
import SectionHeading from '@/components/SectionHeading';

async function loadRepo(): Promise<RepoStats | null> {
  try {
    return await fetchRepoStats('prerender-stats-build');
  } catch (error) {
    logger.warn('stats.section.unavailable', { reason: error });
    return null;
  }
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default async function Stats() {
  const [repo, apk] = await Promise.all([loadRepo(), getApkInfo()]);

  const items = [
    { label: 'GitHub stars', value: repo ? repo.stars.toLocaleString('en-US') : 'Unavailable' },
    { label: 'Forks', value: repo ? repo.forks.toLocaleString('en-US') : 'Unavailable' },
    { label: 'Download size', value: apk.available ? formatFileSize(apk.sizeBytes) : '~57.7 KB' },
    { label: 'Installed size', value: '219 KB' },
    { label: 'Min Android', value: '8.0+ (API 26)' },
  ];

  return (
    <section aria-labelledby="stats-title" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          titleId="stats-title"
          title="Numbers from the project"
          subtitle="Live figures from the public repository and the current release."
        />
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-ink-700 shadow-raised-md md:grid-cols-5">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col gap-2 bg-ink-900 p-6">
              <dt className="text-sm text-ink-400">{item.label}</dt>
              <dd className="font-display text-2xl font-semibold text-ink-100 sm:text-3xl">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
