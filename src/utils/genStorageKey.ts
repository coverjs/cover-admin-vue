import { loadEnv } from '.';

export function genStorageKey(key: string) {
  return `${loadEnv().VITE_APP_NAMESPACE}_${key}`;
}
