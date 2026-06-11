import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import { AppError, ApiResponse } from '../types/app';
import { config } from '../config/index';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // AppError — structured, intentional errors
  if (err instanceof AppError) {
    const response: ApiResponse<never> = {
      success: false,
      error: {
        code: err.code,
        message: err.message,
        statusCode: err.statusCode,
      },
    };
    res.status(err.statusCode).json(response);
    return;
  }

  // Axios errors that weren't caught by the service layer
  if ((err as AxiosError).isAxiosError) {
    const axiosErr = err as AxiosError;
    const status = axiosErr.response?.status;

    let code = 'GITHUB_API_ERROR';
    let message = 'An error occurred while communicating with GitHub';
    let statusCode = 502;

    if (status === 404) {
      code = 'USER_NOT_FOUND';
      message = 'The requested resource was not found on GitHub';
      statusCode = 404;
    } else if (status === 403 || status === 429) {
      code = 'RATE_LIMITED';
      message = 'GitHub API rate limit exceeded. Please try again later.';
      statusCode = 429;
    } else if (!axiosErr.response) {
      code = 'NETWORK_ERROR';
      message = 'Unable to reach GitHub API. Please check your network connection.';
      statusCode = 503;
    }

    const response: ApiResponse<never> = {
      success: false,
      error: { code, message, statusCode },
    };
    res.status(statusCode).json(response);
    return;
  }

  // Unexpected errors
  if (!config.isProduction) {
    console.error('Unhandled error:', err);
  }

  const response: ApiResponse<never> = {
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: config.isProduction
        ? 'An unexpected internal error occurred'
        : err.message || 'An unexpected internal error occurred',
      statusCode: 500,
    },
  };
  res.status(500).json(response);
}
