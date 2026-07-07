import { Request, Response } from 'express';

import { HttpStatus } from '../constants/http-status';
import { AppError } from '../utils/app-error';
import { asyncHandler } from '../utils/async-handler';
import { createDemoOrder, listDemoOrders, updateDemoOrderStatus } from './demo-order.store';
import { DemoOrder, DemoOrderStatus } from './demo-order.types';

export const getDemoOrders = asyncHandler(async (_request: Request, response: Response) => {
  return response.status(HttpStatus.OK).json({
    data: listDemoOrders(),
  });
});

export const postDemoOrder = asyncHandler(async (request: Request, response: Response) => {
  const order = request.body as DemoOrder;

  return response.status(HttpStatus.CREATED).json({
    data: createDemoOrder(order),
    message: 'Demo order created',
  });
});

export const patchDemoOrderStatus = asyncHandler(async (request: Request, response: Response) => {
  const { orderId } = request.params as { orderId: string };
  const { status } = request.body as { status: DemoOrderStatus };
  const order = updateDemoOrderStatus(orderId, status);

  if (!order) {
    throw new AppError('Demo order not found', HttpStatus.NOT_FOUND);
  }

  return response.status(HttpStatus.OK).json({
    data: order,
    message: 'Demo order status updated',
  });
});
