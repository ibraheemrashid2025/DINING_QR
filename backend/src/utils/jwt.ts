import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

import { env } from '../config/env';

type TokenKind = 'access' | 'refresh';

const getSecret = (kind: TokenKind) =>
  kind === 'access' ? env.JWT_ACCESS_SECRET : env.JWT_REFRESH_SECRET;

const getExpiresIn = (kind: TokenKind) =>
  kind === 'access' ? env.JWT_ACCESS_EXPIRES_IN : env.JWT_REFRESH_EXPIRES_IN;

export function signToken(payload: object, kind: TokenKind = 'access') {
  const options: SignOptions = {
    expiresIn: getExpiresIn(kind) as SignOptions['expiresIn'],
  };

  return jwt.sign(payload, getSecret(kind), options);
}

export function verifyToken<TPayload extends JwtPayload>(token: string, kind: TokenKind = 'access') {
  return jwt.verify(token, getSecret(kind)) as TPayload;
}
