import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/index';
import { requestLogger } from './middleware/requestLogger';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes/githubRoutes';
import type { ApiResponse } from './types/app';

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: config.ALLOWED_ORIGIN,
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Request logging (skipped in test environment)
app.use(requestLogger);

// Body parsing
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMITED',
      message: 'Too many requests from this IP, please try again later.',
      statusCode: 429,
    },
  },
});
app.use(limiter);

// API routes
app.use(routes);

// 404 handler for unknown routes
app.use((_req, res) => {
  const response: ApiResponse<never> = {
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'The requested endpoint does not exist',
      statusCode: 404,
    },
  };
  res.status(404).json(response);
});

// Central error handler (must be last)
app.use(errorHandler);

export default app;
