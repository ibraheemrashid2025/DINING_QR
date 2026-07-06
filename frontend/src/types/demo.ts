export type MenuCategory = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  price: number;
  imageUrl: string;
  isPopular?: boolean;
  isNew?: boolean;
};

export type OrderStatus = 'new' | 'accepted' | 'preparing' | 'ready' | 'completed';

export type MockOrderItem = {
  id: string;
  name: string;
  quantity: number;
};

export type MockOrder = {
  id: string;
  tableNumber: number;
  status: OrderStatus;
  items: MockOrderItem[];
  notes?: string;
  createdAt: string;
};

export type AdminMenuRow = {
  id: string;
  name: string;
  category: string;
  price: number;
  availability: 'Available' | 'Low stock' | 'Paused';
};

