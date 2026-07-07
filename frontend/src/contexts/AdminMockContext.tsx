import { ReactNode, useCallback, useMemo, useState } from 'react';

import {
  branches as initialBranches,
  menuCategories as initialCategories,
  menuItems as initialMenuItems,
  restaurantTables as initialTables,
} from '../data/mockData';
import { AdminMockContext, AdminMockContextValue, Toast } from './admin-mock.context';

export function AdminMockProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState(initialCategories);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [tables, setTables] = useState(initialTables);
  const [branches, setBranches] = useState(initialBranches);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, tone: Toast['tone'] = 'success') => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { id, message, tone }]);
      window.setTimeout(() => dismissToast(id), 3000);
    },
    [dismissToast],
  );

  const value = useMemo<AdminMockContextValue>(
    () => ({
      categories,
      menuItems,
      tables,
      branches,
      toasts,
      addCategory: (category) => setCategories((current) => [...current, category]),
      updateCategory: (category) =>
        setCategories((current) => current.map((item) => (item.id === category.id ? category : item))),
      deleteCategory: (id) => setCategories((current) => current.filter((item) => item.id !== id)),
      addMenuItem: (item) => setMenuItems((current) => [...current, item]),
      updateMenuItem: (item) =>
        setMenuItems((current) => current.map((currentItem) => (currentItem.id === item.id ? item : currentItem))),
      deleteMenuItem: (id) => setMenuItems((current) => current.filter((item) => item.id !== id)),
      addTable: (table) => setTables((current) => [...current, table]),
      updateTable: (table) =>
        setTables((current) => current.map((currentTable) => (currentTable.id === table.id ? table : currentTable))),
      deleteTable: (id) => setTables((current) => current.filter((table) => table.id !== id)),
      addBranch: (branch) => setBranches((current) => [...current, branch]),
      updateBranch: (branch) =>
        setBranches((current) => current.map((currentBranch) => (currentBranch.id === branch.id ? branch : currentBranch))),
      deleteBranch: (id) => setBranches((current) => current.filter((branch) => branch.id !== id)),
      notify,
      dismissToast,
    }),
    [branches, categories, dismissToast, menuItems, notify, tables, toasts],
  );

  return <AdminMockContext.Provider value={value}>{children}</AdminMockContext.Provider>;
}
