import { ReactNode } from 'react';

import { AppConfigContext, appConfig } from './app-config.context';

type AppConfigProviderProps = {
  children: ReactNode;
};

export function AppConfigProvider({ children }: AppConfigProviderProps) {
  return <AppConfigContext.Provider value={appConfig}>{children}</AppConfigContext.Provider>;
}
