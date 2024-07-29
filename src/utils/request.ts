import type { ApiConfig } from "@/services";

import { Api } from "@/services";
import { interceptors } from "@/interceptors";
import { OnionInterceptor } from "onion-interceptor";

import objHash from "object-hash";

const DEFAULT_CONFIG = {
  baseURL: "http://154.221.27.105:1118",
} as const;

const apis: Map<string, Api<unknown>> = new Map();

export function createApi(config: ApiConfig = DEFAULT_CONFIG) {
  const key = objHash(config);

  if (apis.has(key)) {
    return apis.get(key)?.api!;
  }

  const http = new Api(config);

  const onionInterceptor = new OnionInterceptor(http.instance);
  onionInterceptor.use(...interceptors);

  apis.set(key, http);
  return http.api;
}
