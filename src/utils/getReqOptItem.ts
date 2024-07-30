import type { RequestParams } from "@/services/http";
import type { CustomRequestOptions } from "@/types";

const DEFAULT_CONFIG: CustomRequestOptions = {
  authInterceptorEnabled: true,
  errorInterceptorEnabled: true,
  loadingInterceptorEnabled: true,
} as const;

export function getReqOptItem(
  params: RequestParams,
  key: keyof CustomRequestOptions
) {
  return !!(params?.customOptions?.[key] ?? DEFAULT_CONFIG[key]);
}
