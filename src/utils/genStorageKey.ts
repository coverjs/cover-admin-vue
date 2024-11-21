import { loadEnv } from '.';

export const genStorageKey = (key: string) =>
  `${loadEnv().VITE_APP_NAMESPACE}_${key}`;
