import { Navigate, Route, Routes } from 'react-router-dom';

import { AdminLayout } from '../layouts/AdminLayout';
import { RootLayout } from '../layouts/RootLayout';
import { CounterDemoPage } from '../pages/CounterDemoPage';
import { DemoPage } from '../pages/DemoPage';
import { FoundationPage } from '../pages/FoundationPage';
import { KitchenDemoPage } from '../pages/KitchenDemoPage';
import { LoginPage } from '../pages/LoginPage';
import { MenuDemoPage } from '../pages/MenuDemoPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';
import { AdminBranchesPage } from '../pages/admin/AdminBranchesPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminMenuPage } from '../pages/admin/AdminMenuPage';
import { AdminTablesPage } from '../pages/admin/AdminTablesPage';
import { adminRouteRoles, counterRouteRoles, kitchenRouteRoles } from './auth-routing';
import { ProtectedRoute } from './ProtectedRoute';
import { defaultDemoQrToken } from '../data/mockTableTokens';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Navigate replace to={`/menu/t/${defaultDemoQrToken}`} />} path="/menu" />
      <Route element={<MenuDemoPage />} path="/menu/t/:qrToken" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<UnauthorizedPage />} path="/unauthorized" />
      <Route
        element={
          <ProtectedRoute allowedRoles={counterRouteRoles}>
            <CounterDemoPage />
          </ProtectedRoute>
        }
        path="/counter"
      />
      <Route
        element={
          <ProtectedRoute allowedRoles={kitchenRouteRoles}>
            <KitchenDemoPage />
          </ProtectedRoute>
        }
        path="/kitchen"
      />
      <Route
        element={
          <ProtectedRoute allowedRoles={adminRouteRoles}>
            <AdminLayout />
          </ProtectedRoute>
        }
        path="/admin"
      >
        <Route element={<Navigate replace to="/admin/dashboard" />} index />
        <Route element={<AdminDashboardPage />} path="dashboard" />
        <Route element={<AdminCategoriesPage />} path="categories" />
        <Route element={<AdminMenuPage />} path="menu" />
        <Route element={<AdminTablesPage />} path="tables" />
        <Route element={<AdminBranchesPage />} path="branches" />
      </Route>
      <Route element={<RootLayout />}>
        <Route element={<FoundationPage />} index />
        <Route element={<DemoPage />} path="demo" />
        <Route element={<NotFoundPage />} path="*" />
      </Route>
    </Routes>
  );
}
