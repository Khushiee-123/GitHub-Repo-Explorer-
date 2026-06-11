import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { AppError } from '../src/types/app';
import type { GitHubUserProfile } from '../src/types/github';

// Mock the entire github service module
vi.mock('../src/services/githubService', () => ({
  getUserProfile: vi.fn(),
  getUserRepos: vi.fn(),
  getCacheStats: vi.fn().mockReturnValue({ profileCacheSize: 0, reposCacheSize: 0 }),
  shutdownCaches: vi.fn(),
}));

// Import after mocking so we get the mocked version
import * as githubService from '../src/services/githubService';

const mockedGetUserProfile = vi.mocked(githubService.getUserProfile);
const mockedGetUserRepos = vi.mocked(githubService.getUserRepos);

// Fixture data
const mockProfile: GitHubUserProfile = {
  username: 'torvalds',
  name: 'Linus Torvalds',
  avatarUrl: 'https://avatars.githubusercontent.com/u/1024025?v=4',
  bio: null,
  company: 'Linux Foundation',
  location: 'Portland, OR',
  blog: 'https://lkml.org',
  twitterUsername: null,
  followers: 200000,
  following: 0,
  publicRepos: 7,
  publicGists: 0,
  createdAt: '2011-09-03T15:26:22Z',
  profileUrl: 'https://github.com/torvalds',
};

describe('GitHub Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET /api/health returns 200 with status ok', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('status', 'ok');
    expect(res.body.data).toHaveProperty('timestamp');
    expect(res.body.data).toHaveProperty('uptime');
  });

  it('GET /api/github/users/invalid--name returns 400 INVALID_USERNAME', async () => {
    const res = await request(app).get('/api/github/users/invalid--name');

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe('INVALID_USERNAME');
    expect(res.body.error.statusCode).toBe(400);
  });

  it('GET /api/github/users/nonexistent returns 404 USER_NOT_FOUND', async () => {
    mockedGetUserProfile.mockRejectedValue(
      new AppError('USER_NOT_FOUND', 'GitHub user "nonexistent" not found', 404)
    );

    const res = await request(app).get('/api/github/users/nonexistent');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('USER_NOT_FOUND');
    expect(res.body.error.statusCode).toBe(404);
  });

  it('GET /api/github/users/torvalds returns 200 with correct shape', async () => {
    mockedGetUserProfile.mockResolvedValue(mockProfile);

    const res = await request(app).get('/api/github/users/torvalds');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toBeDefined();

    const data = res.body.data;
    expect(data.username).toBe('torvalds');
    expect(data.name).toBe('Linus Torvalds');
    expect(data.avatarUrl).toBeDefined();
    expect(data.followers).toBeTypeOf('number');
    expect(data.following).toBeTypeOf('number');
    expect(data.publicRepos).toBeTypeOf('number');
    expect(data.createdAt).toBeDefined();
    expect(data.profileUrl).toBe('https://github.com/torvalds');
  });
});
