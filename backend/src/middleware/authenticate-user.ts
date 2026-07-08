import { NextFunction, Request, Response } from 'express';

import { getAuthUser } from '../auth/auth.service';
import { AuthenticatedRequest, AuthTokenPayload } from '../auth/auth.types';
import { HttpStatus } from '../constants/http-status';
import { AppError } from '../utils/app-error';
import { verifyToken } from '../utils/jwt';

export async function authenticateUser(request: Request, _response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    next(new AppError('Authentication required', HttpStatus.UNAUTHORIZED));
    return;
  }

  try {
    const payload = verifyToken<AuthTokenPayload>(token, 'access');

    if (payload.tokenType !== 'access') {
      throw new AppError('Authentication required', HttpStatus.UNAUTHORIZED);
    }

    (request as AuthenticatedRequest).user = await getAuthUser(payload.sub);
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }

    next(new AppError('Authentication required', HttpStatus.UNAUTHORIZED));
  }
}
