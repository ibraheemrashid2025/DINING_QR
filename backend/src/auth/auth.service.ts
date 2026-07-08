import { Prisma } from '@prisma/client';

import { prisma } from '../config/database';
import { HttpStatus } from '../constants/http-status';
import { AppError } from '../utils/app-error';
import { comparePassword } from '../utils/password';
import { signToken, verifyToken } from '../utils/jwt';
import { AuthTokenPayload, AuthTokens, AuthUser } from './auth.types';

const userWithRoleArgs = {
  include: {
    role: true,
  },
} satisfies Prisma.UserDefaultArgs;

type UserWithRole = Prisma.UserGetPayload<typeof userWithRoleArgs>;

function logLoginStep(message: string, metadata?: Record<string, unknown>) {
  console.info('[auth:login]', message, metadata ?? {});
}

function toAuthUser(user: UserWithRole): AuthUser {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role.name,
    restaurantId: user.restaurantId,
    branchId: user.branchId,
  };
}

function createTokens(user: AuthUser): AuthTokens {
  logLoginStep('JWT sign step reached', {
    userId: user.id,
    role: user.role,
  });

  return {
    accessToken: signToken({ sub: user.id, role: user.role, tokenType: 'access' }, 'access'),
    refreshToken: signToken({ sub: user.id, role: user.role, tokenType: 'refresh' }, 'refresh'),
  };
}

async function findActiveUserById(userId: string) {
  return prisma.user.findFirst({
    where: {
      id: userId,
      isActive: true,
      status: 'ACTIVE',
      role: {
        isActive: true,
      },
    },
    ...userWithRoleArgs,
  });
}

export async function loginWithPassword(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  logLoginStep('email being searched', {
    email: normalizedEmail,
  });

  const user = await prisma.user.findFirst({
    where: {
      email: normalizedEmail,
      isActive: true,
      status: 'ACTIVE',
      role: {
        isActive: true,
      },
    },
    ...userWithRoleArgs,
  });

  logLoginStep('user lookup completed', {
    email: normalizedEmail,
    userFound: user !== null,
    roleRelationExists: Boolean(user?.role),
  });

  if (!user) {
    throw new AppError('Invalid email or password', HttpStatus.UNAUTHORIZED);
  }

  if (!user.role) {
    throw new AppError('User role is not configured', HttpStatus.INTERNAL_SERVER_ERROR);
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);

  logLoginStep('bcrypt compare completed', {
    email: normalizedEmail,
    isPasswordValid,
  });

  if (!isPasswordValid) {
    throw new AppError('Invalid email or password', HttpStatus.UNAUTHORIZED);
  }

  const authUser = toAuthUser(user);

  return {
    user: authUser,
    tokens: createTokens(authUser),
  };
}

export async function getAuthUser(userId: string) {
  const user = await findActiveUserById(userId);

  if (!user) {
    throw new AppError('Authentication required', HttpStatus.UNAUTHORIZED);
  }

  return toAuthUser(user);
}

export async function refreshAccessToken(refreshToken: string) {
  let payload: AuthTokenPayload;

  try {
    payload = verifyToken<AuthTokenPayload>(refreshToken, 'refresh');
  } catch {
    throw new AppError('Invalid refresh token', HttpStatus.UNAUTHORIZED);
  }

  if (payload.tokenType !== 'refresh') {
    throw new AppError('Invalid refresh token', HttpStatus.UNAUTHORIZED);
  }

  const user = await getAuthUser(payload.sub);

  return {
    user,
    accessToken: signToken({ sub: user.id, role: user.role, tokenType: 'access' }, 'access'),
  };
}
