import { Router } from 'express';

import { demoOrderRouter } from './demo-order.routes';
import { healthRouter } from './health.routes';

export const apiRouter = Router();

apiRouter.use('/demo-orders', demoOrderRouter);
apiRouter.use('/health', healthRouter);
