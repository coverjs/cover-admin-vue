import { CustromRequestParams } from "@/services";

export interface CustomRequestOptions {
  loadingInterceptorEnabled?: boolean;
  errorInterceptorEnabled?: boolean;
  authInterceptorEnabled?: boolean;
}

export type RequestParams = CustromRequestParams<CustomRequestOptions>;
