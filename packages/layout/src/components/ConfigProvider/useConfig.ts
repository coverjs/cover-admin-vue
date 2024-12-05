import { inject } from 'vue';
import { CONFIG_CTX_KEY } from './constants';

export function useConfig() {
  const config = inject(CONFIG_CTX_KEY);
  return config;
}

export default useConfig;
