import rateLimit from 'express-rate-limit';

import { env } from '../config/env';
import { HttpStatus } from '../constants/http-status';

export const apiRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    statusCode: HttpStatus.TOO_MANY_REQUESTS,
    message: 'Too many requests. Please try again later.',
  },
});

