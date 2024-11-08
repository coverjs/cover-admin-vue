import type { ApiConfig } from './http';

import { Api } from './http';
import { interceptors } from '@/interceptors';
import { createInterceptor } from 'onion-interceptor';
import { defaultRequestConfig } from '@config';

import objHash from 'object-hash';

const apis: Map<string, Api<unknown>> = new Map();

export function createApi(config: ApiConfig = defaultRequestConfig) {
  const key = objHash(config);

  if (apis.has(key)) return apis.get(key)!;

  const api = new Api(config);

  createInterceptor(api.instance).use(...interceptors);

  apis.set(key, api);
  return api;
}

export * from './http';

export const api = createApi();
