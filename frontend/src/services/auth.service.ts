import { httpClient } from '../api/httpClient';
import { LoginResponse, MeResponse, RefreshTokenResponse } from '../types/auth';

export async function loginUser(email: string, password: string) {
  const response = await httpClient.post<LoginResponse>('/auth/login', { email, password });
  return response.data.data;
}

export async function logoutUser() {
  await httpClient.post('/auth/logout');
}

export async function refreshAccessToken(refreshToken: string) {
  const response = await httpClient.post<RefreshTokenResponse>('/auth/refresh-token', {
    refreshToken,
  });
  return response.data.data;
}

export async function getCurrentUser() {
  const response = await httpClient.get<MeResponse>('/auth/me');
  return response.data.data.user;
}
