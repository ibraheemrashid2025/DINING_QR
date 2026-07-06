import { createContext } from 'react';

export type AppConfig = {
  appName: string;
};

export const appConfig: AppConfig = {
  appName: 'Restaurant QR Ordering Platform',
};

export const AppConfigContext = createContext<AppConfig | undefined>(undefined);

