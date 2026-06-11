import apiClient from './client';
import type { GitHubUserProfile, GitHubRepoPage } from '../types/github';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

/**
 * Fetch a GitHub user profile by username.
 */
export async function fetchUserProfile(username: string): Promise<GitHubUserProfile> {
  const response = await apiClient.get<ApiEnvelope<GitHubUserProfile>>(
    `/api/github/users/${encodeURIComponent(username)}`
  );
  return response.data.data;
}

/**
 * Fetch a page of repositories for a GitHub user.
 */
export async function fetchUserRepos(username: string, page: number = 1): Promise<GitHubRepoPage> {
  const response = await apiClient.get<ApiEnvelope<GitHubRepoPage>>(
    `/api/github/users/${encodeURIComponent(username)}/repos`,
    { params: { page } }
  );
  return response.data.data;
}
