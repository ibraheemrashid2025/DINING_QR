import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import { env } from '../config/env';
import { HttpStatus } from '../constants/http-status';
import { AppError } from '../utils/app-error';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      message: 'Validation failed',
      errors: error.flatten(),
    });
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      message: error.message,
      details: error.details,
    });
  }

  return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
    details: env.NODE_ENV === 'production' ? undefined : String(error),
  });
};

