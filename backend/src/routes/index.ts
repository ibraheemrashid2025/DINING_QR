import { Router } from 'express';

import { authRouter } from './auth.routes';
import { demoOrderRouter } from './demo-order.routes';
import { healthRouter } from './health.routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/demo-orders', demoOrderRouter);
apiRouter.use('/health', healthRouter);
