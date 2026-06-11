import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT || '3001', 10),
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  CACHE_TTL_SECONDS: parseInt(process.env.CACHE_TTL_SECONDS || '60', 10),
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development',

  get isProduction(): boolean {
    return this.NODE_ENV === 'production';
  },

  get isTest(): boolean {
    return this.NODE_ENV === 'test';
  },

  GITHUB_API_BASE_URL: 'https://api.github.com',
  RATE_LIMIT_WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: 100,
  REPOS_PER_PAGE: 30,
} as const;
