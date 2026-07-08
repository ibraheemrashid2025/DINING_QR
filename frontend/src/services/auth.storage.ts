const ACCESS_TOKEN_KEY = 'auth.accessToken';
const REFRESH_TOKEN_KEY = 'auth.refreshToken';

function canUseLocalStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getStoredAccessToken() {
  return canUseLocalStorage() ? window.localStorage.getItem(ACCESS_TOKEN_KEY) : null;
}

export function getStoredRefreshToken() {
  return canUseLocalStorage() ? window.localStorage.getItem(REFRESH_TOKEN_KEY) : null;
}

export function storeAuthTokens(accessToken: string, refreshToken: string) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function storeAccessToken(accessToken: string) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function clearAuthTokens() {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}
