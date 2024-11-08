import type { ApiConfig } from './http';
import { Api } from './http';
import { interceptors } from '@/interceptors';
import { createInterceptor } from 'onion-interceptor';

import objHash from 'object-hash';
import CustomRequestOptions from '@/services/types';

const DEFAULT_CONFIG = {
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  customOptions: {
    // 是否开启loading拦截器
    loadingInterceptorEnabled: true,
    // 是否开启错误拦截器
    errorInterceptorEnabled: true,
    // 是否开启token拦截器
    authInterceptorEnabled: true,
    // 是否自动取消重复请求
    ignoreCancelToken: true,
    // 是否携带token
    withToken: true,
    // 错误提示方式
    errorMessageMode: 'message',
    // 成功提示方式
    successMessageMode: 'message',
  } as CustomRequestOptions,
} as const;

const apis: Map<string, Api<unknown>> = new Map();

export function createApi(config: ApiConfig = DEFAULT_CONFIG) {
  const key = objHash(config);

  if (apis.has(key)) {
    return apis.get(key)!;
  }

  const api = new Api(config);

  createInterceptor(api.instance).use(...interceptors);

  apis.set(key, api);
  return api;
}

export const api = createApi();
