import { z } from 'zod';

import { demoOrderStatuses } from './demo-order.types';

const demoOrderItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  price: z.number().nonnegative().optional(),
});

export const createDemoOrderSchema = z.object({
  body: z.object({
    orderId: z.string().min(1),
    customerName: z.string().min(1),
    tableId: z.string().min(1),
    tableNumber: z.number().int().positive(),
    branchId: z.string().min(1),
    branchName: z.string().min(1),
    qrToken: z.string().min(16),
    items: z.array(demoOrderItemSchema).min(1),
    totalBill: z.number().nonnegative(),
    notes: z.string().trim().optional(),
    status: z.enum(demoOrderStatuses).default('new'),
    createdAt: z.string().min(1),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const updateDemoOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(demoOrderStatuses),
  }),
  query: z.object({}).optional(),
  params: z.object({
    orderId: z.string().min(1),
  }),
});
