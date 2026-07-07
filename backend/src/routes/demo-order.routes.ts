import { Router } from 'express';

import {
  getDemoOrders,
  patchDemoOrderStatus,
  postDemoOrder,
} from '../demo-orders/demo-order.controller';
import {
  createDemoOrderSchema,
  updateDemoOrderStatusSchema,
} from '../demo-orders/demo-order.validators';
import { validate } from '../middleware/validate';

export const demoOrderRouter = Router();

demoOrderRouter.get('/', getDemoOrders);
demoOrderRouter.post('/', validate(createDemoOrderSchema), postDemoOrder);
demoOrderRouter.patch('/:orderId/status', validate(updateDemoOrderStatusSchema), patchDemoOrderStatus);
