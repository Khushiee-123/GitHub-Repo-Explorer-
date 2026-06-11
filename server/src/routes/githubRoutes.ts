import { Router, Request, Response } from 'express';
import { validateUsername } from '../middleware/validateUsername';
import { searchUser, getUserRepos, getCacheStats } from '../controllers/githubController';

const router = Router();

// GitHub user profile
router.get('/api/github/users/:username', validateUsername, searchUser);

// GitHub user repositories (paginated)
router.get('/api/github/users/:username/repos', validateUsername, getUserRepos);

// Cache statistics
router.get('/api/github/cache-stats', getCacheStats);

// Health check
router.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
});

export default router;
