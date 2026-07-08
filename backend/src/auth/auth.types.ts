import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

import { AppRole } from './auth.roles';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: AppRole | string;
  restaurantId: string | null;
  branchId: string | null;
};

export type AuthTokenPayload = JwtPayload & {
  sub: string;
  role: string;
  tokenType: 'access' | 'refresh';
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthenticatedRequest = Request & {
  user?: AuthUser;
};
