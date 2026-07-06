import axios from 'axios';

import { env } from '../utils/env';

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
});

