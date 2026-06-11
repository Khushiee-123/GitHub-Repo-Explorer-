export interface GitHubUserProfile {
  username: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitterUsername: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  publicGists: number;
  createdAt: string;
  profileUrl: string;
}

export interface TransformedRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  defaultBranch: string;
  isArchived: boolean;
  isFork: boolean;
  topics: string[];
  license: string | null;
  updatedAt: string;
  pushedAt: string;
  createdAt: string;
}

export interface GitHubRepoPage {
  repos: TransformedRepo[];
  hasMore: boolean;
  page: number;
}

export class ApiError extends Error {
  code: string;
  statusCode: number;

  constructor(code: string, message: string, statusCode: number) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

export type SortOption = 'stars' | 'name' | 'updated';
