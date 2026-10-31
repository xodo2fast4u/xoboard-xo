import { env } from '@/lib/env';
import { AppError, problems } from '@/lib/errors';
import { logger } from '@/lib/logger';

export type RepoStats = {
  repo: string;
  stars: number;
  forks: number;
  openIssues: number;
  updatedAt: string;
};

type GithubRepo = {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
};

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchRepoStats(requestId: string): Promise<RepoStats> {
  const config = env();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'xoboard-web',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (config.GITHUB_TOKEN) headers['Authorization'] = `Bearer ${config.GITHUB_TOKEN}`;

  let lastFailure: unknown;
  const attempts = config.UPSTREAM_RETRIES + 1;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(`https://api.github.com/repos/${config.GITHUB_REPO}`, {
        method: 'GET',
        headers,
        signal: AbortSignal.timeout(config.UPSTREAM_TIMEOUT_MS),
        next: { revalidate: 3600 },
      });
      if (response.ok) {
        const data = (await response.json()) as GithubRepo;
        return {
          repo: config.GITHUB_REPO,
          stars: data.stargazers_count,
          forks: data.forks_count,
          openIssues: data.open_issues_count,
          updatedAt: data.updated_at,
        };
      }
      lastFailure = new Error(`github responded with status ${response.status}`);
      if (response.status === 404) {
        break;
      }
    } catch (error) {
      lastFailure = error;
    }

    logger.warn('upstream.github.attempt_failed', {
      requestId,
      attempt: attempt + 1,
      maxAttempts: attempts,
      reason: lastFailure,
    });
    if (attempt < attempts - 1) await delay(250 * 2 ** attempt);
  }

  throw new AppError(problems.upstreamUnavailable, { cause: lastFailure });
}
