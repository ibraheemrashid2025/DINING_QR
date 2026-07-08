import { UserRole } from '../types/auth';

export const adminRouteRoles: UserRole[] = ['SUPER_ADMIN', 'RESTAURANT_OWNER', 'BRANCH_MANAGER'];
export const counterRouteRoles: UserRole[] = ['COUNTER_STAFF'];
export const kitchenRouteRoles: UserRole[] = ['KITCHEN_STAFF'];

export function getDefaultRouteForRole(role: UserRole) {
  if (adminRouteRoles.includes(role)) {
    return '/admin/dashboard';
  }

  if (counterRouteRoles.includes(role)) {
    return '/counter';
  }

  if (kitchenRouteRoles.includes(role)) {
    return '/kitchen';
  }

  return '/';
}
