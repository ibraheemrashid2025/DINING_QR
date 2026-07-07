import { createContext } from 'react';

import { Branch, MenuCategory, MenuItem, RestaurantTable } from '../types/demo';

export type Toast = {
  id: string;
  message: string;
  tone: 'success' | 'info';
};

export type AdminMockContextValue = {
  categories: MenuCategory[];
  menuItems: MenuItem[];
  tables: RestaurantTable[];
  branches: Branch[];
  toasts: Toast[];
  addCategory: (category: MenuCategory) => void;
  updateCategory: (category: MenuCategory) => void;
  deleteCategory: (id: string) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  addTable: (table: RestaurantTable) => void;
  updateTable: (table: RestaurantTable) => void;
  deleteTable: (id: string) => void;
  addBranch: (branch: Branch) => void;
  updateBranch: (branch: Branch) => void;
  deleteBranch: (id: string) => void;
  notify: (message: string, tone?: Toast['tone']) => void;
  dismissToast: (id: string) => void;
};

export const AdminMockContext = createContext<AdminMockContextValue | undefined>(undefined);
