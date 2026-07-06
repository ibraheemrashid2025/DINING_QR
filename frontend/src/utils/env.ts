type ClientEnv = {
  apiBaseUrl: string;
};

function getRequiredEnv(name: keyof ImportMetaEnv): string {
  const value = import.meta.env[name];

  if (!value) {
    return 'http://localhost:5000/api';
  }

  return value;
}

export const env: ClientEnv = {
  apiBaseUrl: getRequiredEnv('VITE_API_BASE_URL'),
};
