import type { ApiConfig } from '@/services';
import { interceptors } from '@/interceptors';
import { Api } from '@/services';
import { defaultRequestConfig } from '@config';
import objHash from 'object-hash';
import { createInterceptor } from 'onion-interceptor';

const apis: Map<string, Api<unknown>> = new Map();

export function createApi(config: ApiConfig = defaultRequestConfig) {
  const key = objHash(config);

  if (apis.has(key))
    return apis.get(key)!;

  const api = new Api<unknown>(config);

  createInterceptor(api.instance).use(...interceptors);

  apis.set(key, api);
  return api;
}

export * from './api';

export const api = createApi();
