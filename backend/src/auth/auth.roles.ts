export const appRoles = [
  'SUPER_ADMIN',
  'RESTAURANT_OWNER',
  'BRANCH_MANAGER',
  'COUNTER_STAFF',
  'KITCHEN_STAFF',
] as const;

export type AppRole = (typeof appRoles)[number];

export const adminRoles: AppRole[] = ['SUPER_ADMIN', 'RESTAURANT_OWNER', 'BRANCH_MANAGER'];
export const counterRoles: AppRole[] = ['COUNTER_STAFF'];
export const kitchenRoles: AppRole[] = ['KITCHEN_STAFF'];
