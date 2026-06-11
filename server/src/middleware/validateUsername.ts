import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types/app';

const USERNAME_REGEX = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
const CONSECUTIVE_HYPHENS = /--/;

export function validateUsername(req: Request, _res: Response, next: NextFunction): void {
  const username = req.params.username as string | undefined;

  if (!username || !USERNAME_REGEX.test(username) || CONSECUTIVE_HYPHENS.test(username)) {
    const error = new AppError(
      'INVALID_USERNAME',
      'Invalid GitHub username format. Usernames must be 1-39 alphanumeric characters or hyphens, and cannot start or end with a hyphen.',
      400
    );
    next(error);
    return;
  }

  next();
}

