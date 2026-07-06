import { Request, Response } from 'express';

import { HttpStatus } from '../constants/http-status';

export function getHealth(_request: Request, response: Response) {
  return response.status(HttpStatus.OK).json({
    status: 'ok',
    service: 'restaurant-qr-ordering-api',
    timestamp: new Date().toISOString(),
  });
}

