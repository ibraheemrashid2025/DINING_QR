export const demoOrderStatuses = ['new', 'accepted', 'preparing', 'ready', 'completed'] as const;

export type DemoOrderStatus = (typeof demoOrderStatuses)[number];

export type DemoOrderItem = {
  id: string;
  name: string;
  quantity: number;
  price?: number;
};

export type DemoOrder = {
  orderId: string;
  customerName: string;
  tableId: string;
  tableNumber: number;
  branchId: string;
  branchName: string;
  qrToken: string;
  items: DemoOrderItem[];
  totalBill: number;
  notes?: string;
  status: DemoOrderStatus;
  createdAt: string;
};
