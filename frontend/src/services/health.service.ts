import { httpClient } from '../api/httpClient';
import { HealthResponse } from '../types/api';

export async function getHealth(): Promise<HealthResponse> {
  const response = await httpClient.get<HealthResponse>('/health');
  return response.data;
}

