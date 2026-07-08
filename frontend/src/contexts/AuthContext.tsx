import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { getCurrentUser, loginUser, logoutUser, refreshAccessToken } from '../services/auth.service';
import {
  clearAuthTokens,
  getStoredAccessToken,
  getStoredRefreshToken,
  storeAccessToken,
  storeAuthTokens,
} from '../services/auth.storage';
import { AuthUser } from '../types/auth';
import { AuthContext, AuthContextValue } from './auth.context';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      const accessToken = getStoredAccessToken();
      const refreshToken = getStoredRefreshToken();

      if (!accessToken && !refreshToken) {
        if (isMounted) {
          setIsLoading(false);
        }
        return;
      }

      try {
        if (accessToken) {
          const currentUser = await getCurrentUser();
          if (isMounted) {
            setUser(currentUser);
          }
          return;
        }

        if (refreshToken) {
          const refreshed = await refreshAccessToken(refreshToken);
          storeAccessToken(refreshed.accessToken);
          if (isMounted) {
            setUser(refreshed.user);
          }
        }
      } catch {
        clearAuthTokens();
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const authResult = await loginUser(email, password);
    storeAuthTokens(authResult.tokens.accessToken, authResult.tokens.refreshToken);
    setUser(authResult.user);
    return authResult.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      if (getStoredAccessToken()) {
        await logoutUser();
      }
    } catch {
      // Stateless JWT logout is completed client-side for now.
    } finally {
      clearAuthTokens();
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
    }),
    [isLoading, login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
