import axios, { AxiosInstance, AxiosError } from 'axios';
import https from 'https';
import { config } from '../config/index';
import { createCache, InMemoryCache } from '../cache/inMemoryCache';
import { transformUser, transformRepo } from '../utils/transformers';
import { AppError } from '../types/app';
import type {
  GitHubApiUser,
  GitHubApiRepo,
  GitHubUserProfile,
  GitHubRepoPage,
} from '../types/github';

// --- Axios instance ---

const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 10 });

const githubApi: AxiosInstance = axios.create({
  baseURL: config.GITHUB_API_BASE_URL,
  timeout: 10_000,
  httpsAgent,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    ...(config.GITHUB_TOKEN
      ? { Authorization: `Bearer ${config.GITHUB_TOKEN}` }
      : {}),
  },
});

// --- Caches ---

const profileCache: InMemoryCache<GitHubUserProfile> = createCache<GitHubUserProfile>(
  config.CACHE_TTL_SECONDS
);

const reposCache: InMemoryCache<GitHubRepoPage> = createCache<GitHubRepoPage>(
  config.CACHE_TTL_SECONDS
);

// --- Error handling helper ---

function handleGitHubError(error: unknown, username: string): never {
  if (error instanceof AppError) {
    throw error;
  }

  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError;
    const status = axiosErr.response?.status;

    if (status === 404) {
      throw new AppError(
        'USER_NOT_FOUND',
        `GitHub user "${username}" not found`,
        404
      );
    }

    if (status === 403 || status === 429) {
      throw new AppError(
        'RATE_LIMITED',
        'GitHub API rate limit exceeded. Please try again later.',
        429,
        {
          retryAfter: axiosErr.response?.headers?.['retry-after'] ?? null,
          rateLimitRemaining:
            axiosErr.response?.headers?.['x-ratelimit-remaining'] ?? null,
        }
      );
    }

    if (status && status >= 500) {
      throw new AppError(
        'GITHUB_SERVER_ERROR',
        'GitHub API is experiencing issues. Please try again later.',
        502
      );
    }

    if (axiosErr.code === 'ECONNABORTED' || axiosErr.code === 'ETIMEDOUT') {
      throw new AppError(
        'NETWORK_ERROR',
        'Request to GitHub API timed out.',
        504
      );
    }

    if (!axiosErr.response) {
      throw new AppError(
        'NETWORK_ERROR',
        'Unable to reach GitHub API. Please check your network connection.',
        503
      );
    }

    throw new AppError(
      'GITHUB_API_ERROR',
      `GitHub API returned status ${status}`,
      status || 500
    );
  }

  throw new AppError(
    'INTERNAL_ERROR',
    'An unexpected error occurred',
    500,
    error
  );
}

// --- Public API ---

export async function getUserProfile(username: string): Promise<GitHubUserProfile> {
  const cacheKey = `user:${username.toLowerCase()}`;
  const cached = profileCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await githubApi.get<GitHubApiUser>(`/users/${encodeURIComponent(username)}`);
    const profile = transformUser(response.data);
    profileCache.set(cacheKey, profile);
    return profile;
  } catch (error) {
    handleGitHubError(error, username);
  }
}

export async function getUserRepos(
  username: string,
  page: number = 1
): Promise<GitHubRepoPage> {
  const cacheKey = `repos:${username.toLowerCase()}:page:${page}`;
  const cached = reposCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await githubApi.get<GitHubApiRepo[]>(
      `/users/${encodeURIComponent(username)}/repos`,
      {
        params: {
          per_page: config.REPOS_PER_PAGE,
          page,
          sort: 'updated',
          direction: 'desc',
        },
      }
    );

    const repos = response.data.map(transformRepo);

    // Parse Link header for accurate pagination; fall back to length check
    const linkHeader = response.headers?.link as string | undefined;
    let hasMore: boolean;
    if (linkHeader) {
      hasMore = linkHeader.includes('rel="next"');
    } else {
      hasMore = repos.length === config.REPOS_PER_PAGE;
    }

    const result: GitHubRepoPage = { repos, hasMore, page };
    reposCache.set(cacheKey, result);
    return result;
  } catch (error) {
    handleGitHubError(error, username);
  }
}

export function getCacheStats(): { profileCacheSize: number; reposCacheSize: number } {
  return {
    profileCacheSize: profileCache.size(),
    reposCacheSize: reposCache.size(),
  };
}

export function shutdownCaches(): void {
  profileCache.destroy();
  reposCache.destroy();
}
