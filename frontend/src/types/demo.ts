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
  isAvailable?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
};

export type RestaurantTable = {
  id: string;
  number: number;
  seats: number;
  branchId: string;
};

export type MockTableToken = {
  qrToken: string;
  restaurantName: string;
  branchName: string;
  tableNumber: number;
  tableId: string;
  branchId: string;
};

export type Branch = {
  id: string;
  name: string;
  location: string;
  manager: string;
  phone: string;
};

export type OrderStatus = 'new' | 'accepted' | 'preparing' | 'ready' | 'completed';

export type MockOrderItem = {
  id: string;
  name: string;
  quantity: number;
  price?: number;
};

export type MockOrder = {
  id: string;
  tableId: string;
  tableNumber: number;
  branchId: string;
  branchName: string;
  qrToken: string;
  customerName: string;
  totalBill: number;
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
