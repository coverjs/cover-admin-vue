import type { CustromRequestParams } from "@/services/http";

export type ErrorMessageMode = "none" | "modal" | "message" | void;
export type SuccessMessageMode = ErrorMessageMode;

export interface CustomRequestOptions {
  loadingInterceptorEnabled?: boolean;
  errorInterceptorEnabled?: boolean;
  authInterceptorEnabled?: boolean;
  ignoreCancelToken?: boolean;
  withToken?: boolean;
  errorMessageMode?: ErrorMessageMode;
  successMessageMode?: SuccessMessageMode;
}

export type RequestParams = CustromRequestParams<CustomRequestOptions>;
