import { Request, Response } from 'express';

import { HttpStatus } from '../constants/http-status';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';
import { getAuthUser, loginWithPassword, refreshAccessToken } from './auth.service';
import { AuthenticatedRequest } from './auth.types';

export const login = asyncHandler(async (request: Request, response: Response) => {
  const { email, password } = request.body as { email: string; password: string };

  console.info('[auth:login]', 'login request received', {
    email: email.trim().toLowerCase(),
  });

  try {
    const authResult = await loginWithPassword(email, password);

    return response.status(HttpStatus.OK).json({
      data: authResult,
      message: 'Login successful',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown login error';
    const stack = error instanceof Error ? error.stack : undefined;

    console.error('[auth:login]', 'login failed', {
      email: email.trim().toLowerCase(),
      message,
      stack,
    });

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
});

export const logout = asyncHandler(async (_request: Request, response: Response) => {
  return response.status(HttpStatus.OK).json({
    message: 'Logout successful',
  });
});

export const refreshToken = asyncHandler(async (request: Request, response: Response) => {
  const { refreshToken: token } = request.body as { refreshToken: string };
  const authResult = await refreshAccessToken(token);

  return response.status(HttpStatus.OK).json({
    data: authResult,
    message: 'Access token refreshed',
  });
});

export const me = asyncHandler(async (request: Request, response: Response) => {
  const authenticatedRequest = request as AuthenticatedRequest;

  if (!authenticatedRequest.user) {
    throw new AppError('Authentication required', HttpStatus.UNAUTHORIZED);
  }

  const user = await getAuthUser(authenticatedRequest.user.id);

  return response.status(HttpStatus.OK).json({
    data: {
      user,
    },
  });
});
