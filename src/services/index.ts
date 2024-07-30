import type { ApiConfig } from "./http";
import { Api } from "./http";
import { interceptors } from "@/interceptors";
import { OnionInterceptor } from "onion-interceptor";

import objHash from "object-hash";
import CustomRequestOptions from "@/services/types";

const DEFAULT_CONFIG = {
  baseURL: "http://154.221.27.105:1118",
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
    errorMessageMode: "message",
    // 成功提示方式
    successMessageMode: "message",
  } as CustomRequestOptions,
} as const;

const apis: Map<string, Api<unknown>["api"]> = new Map();

export function createApi(config: ApiConfig = DEFAULT_CONFIG) {
  const key = objHash(config);

  if (apis.has(key)) {
    return apis.get(key)!;
  }

  const http = new Api(config);

  const onionInterceptor = new OnionInterceptor(http.instance);
  onionInterceptor.use(...interceptors);

  apis.set(key, http.api);
  return http.api;
}

export const api = createApi();
