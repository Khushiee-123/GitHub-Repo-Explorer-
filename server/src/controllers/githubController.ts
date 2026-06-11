import { Request, Response } from 'express';
import { asyncHandler, AppError } from '../types/app';
import * as githubService from '../services/githubService';

export const searchUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const username = req.params.username as string;
  const profile = await githubService.getUserProfile(username);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

export const getUserRepos = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const username = req.params.username as string;
  const pageParam = req.query.page;

  let page = 1;
  if (pageParam !== undefined) {
    page = Number(pageParam);
    if (isNaN(page) || !Number.isInteger(page) || page < 1 || page > 100) {
      throw new AppError(
        'INVALID_PAGE',
        'Page parameter must be an integer between 1 and 100',
        400
      );
    }
  }

  const repoPage = await githubService.getUserRepos(username, page);

  res.status(200).json({
    success: true,
    data: repoPage,
  });
});

export const getCacheStats = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const stats = githubService.getCacheStats();

  res.status(200).json({
    success: true,
    data: stats,
  });
});
