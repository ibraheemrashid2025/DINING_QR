import { NextFunction, Request, Response } from 'express';

import { AppRole } from '../auth/auth.roles';
import { AuthenticatedRequest } from '../auth/auth.types';
import { HttpStatus } from '../constants/http-status';
import { AppError } from '../utils/app-error';

export function requireRole(...roles: AppRole[]) {
  return (request: Request, _response: Response, next: NextFunction) => {
    const authenticatedRequest = request as AuthenticatedRequest;

    if (!authenticatedRequest.user) {
      next(new AppError('Authentication required', HttpStatus.UNAUTHORIZED));
      return;
    }

    if (!roles.includes(authenticatedRequest.user.role as AppRole)) {
      next(new AppError('You do not have access to this resource', HttpStatus.FORBIDDEN));
      return;
    }

    next();
  };
}
