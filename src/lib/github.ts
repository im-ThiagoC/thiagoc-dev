import "server-only";

export interface RepoStats {
  stars: number;
  pushedAt: string;
  languages: string[];
}

const GITHUB_API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "thiagoc.dev",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function githubFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${GITHUB_API}${path}`, {
      headers: githubHeaders(),
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github"] },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Live stats for a repository. Returns null on any failure (rate limit,
 * network, 404) so callers can render without the stats — the site must
 * never break because GitHub is unavailable.
 */
export async function getRepoStats(
  repo: `${string}/${string}`,
): Promise<RepoStats | null> {
  const [details, languages] = await Promise.all([
    githubFetch<{ stargazers_count: number; pushed_at: string }>(
      `/repos/${repo}`,
    ),
    githubFetch<Record<string, number>>(`/repos/${repo}/languages`),
  ]);

  if (!details) return null;

  return {
    stars: details.stargazers_count,
    pushedAt: details.pushed_at,
    languages: languages
      ? Object.entries(languages)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([name]) => name)
      : [],
  };
}

export async function getAllRepoStats(
  repos: `${string}/${string}`[],
): Promise<Map<string, RepoStats>> {
  const results = await Promise.allSettled(
    repos.map(async (repo) => ({ repo, stats: await getRepoStats(repo) })),
  );

  const map = new Map<string, RepoStats>();
  for (const result of results) {
    if (result.status === "fulfilled" && result.value.stats) {
      map.set(result.value.repo, result.value.stats);
    }
  }
  return map;
}
