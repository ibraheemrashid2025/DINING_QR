import { Router } from 'express';

import { login, logout, me, refreshToken } from '../auth/auth.controller';
import { loginSchema, refreshTokenSchema } from '../auth/auth.validators';
import { authenticateUser } from '../middleware/authenticate-user';
import { validate } from '../middleware/validate';

export const authRouter = Router();

authRouter.post('/login', validate(loginSchema), login);
authRouter.post('/logout', authenticateUser, logout);
authRouter.post('/refresh-token', validate(refreshTokenSchema), refreshToken);
authRouter.get('/me', authenticateUser, me);
