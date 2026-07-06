type ClientEnv = {
  apiBaseUrl: string;
};

function getRequiredEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env: ClientEnv = {
  apiBaseUrl: getRequiredEnv('VITE_API_BASE_URL'),
};

