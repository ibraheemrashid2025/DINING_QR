import { RequestHandler } from 'express';

import { HttpStatus } from '../constants/http-status';

export const notFoundHandler: RequestHandler = (request, response) => {
  response.status(HttpStatus.NOT_FOUND).json({
    message: `Route ${request.method} ${request.originalUrl} not found`,
  });
};

