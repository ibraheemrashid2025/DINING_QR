export type UserRole =
  | 'SUPER_ADMIN'
  | 'RESTAURANT_OWNER'
  | 'BRANCH_MANAGER'
  | 'COUNTER_STAFF'
  | 'KITCHEN_STAFF';

export type AuthUser = {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  restaurantId: string | null;
  branchId: string | null;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type LoginResponse = {
  data: {
    user: AuthUser;
    tokens: AuthTokens;
  };
  message?: string;
};

export type RefreshTokenResponse = {
  data: {
    user: AuthUser;
    accessToken: string;
  };
  message?: string;
};

export type MeResponse = {
  data: {
    user: AuthUser;
  };
};
