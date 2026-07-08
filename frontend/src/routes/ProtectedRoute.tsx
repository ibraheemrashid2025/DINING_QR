import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../contexts/useAuth';
import { UserRole } from '../types/auth';

type ProtectedRouteProps = {
  allowedRoles: UserRole[];
  children: JSX.Element;
};

export function ProtectedRoute({ allowedRoles, children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#0b0908] px-4 text-stone-50">
        <p className="rounded-full border border-orange-900/40 bg-[#17110f] px-5 py-3 text-sm font-semibold text-orange-200">
          Checking session...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate replace state={{ from: location }} to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate replace to="/unauthorized" />;
  }

  return children;
}
