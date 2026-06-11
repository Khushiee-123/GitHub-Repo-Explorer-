import type { GitHubApiUser, GitHubApiRepo, GitHubUserProfile, TransformedRepo } from '../types/github';

export function transformUser(raw: GitHubApiUser): GitHubUserProfile {
  return {
    username: raw.login,
    name: raw.name,
    avatarUrl: raw.avatar_url,
    bio: raw.bio,
    company: raw.company,
    location: raw.location,
    blog: raw.blog || null,
    twitterUsername: raw.twitter_username,
    followers: raw.followers,
    following: raw.following,
    publicRepos: raw.public_repos,
    publicGists: raw.public_gists,
    createdAt: raw.created_at,
    profileUrl: raw.html_url,
  };
}

export function transformRepo(raw: GitHubApiRepo): TransformedRepo {
  return {
    id: raw.id,
    name: raw.name,
    fullName: raw.full_name,
    description: raw.description,
    url: raw.html_url,
    language: raw.language,
    stars: raw.stargazers_count,
    forks: raw.forks_count,
    openIssues: raw.open_issues_count,
    defaultBranch: raw.default_branch,
    isArchived: raw.archived,
    isFork: raw.fork,
    topics: raw.topics || [],
    license: raw.license?.spdx_id ?? null,
    updatedAt: raw.updated_at,
    pushedAt: raw.pushed_at,
    createdAt: raw.created_at,
  };
}
