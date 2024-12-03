import type { ApiConfig, RequestParams } from '@/services';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | void;
export type SuccessMessageMode = ErrorMessageMode;

export interface CustomRequestOptions {
  loadingInterceptorEnabled?: boolean
  errorInterceptorEnabled?: boolean
  headerInterceptorEnabled?: boolean
  ignoreCancelToken?: boolean
  withToken?: boolean
  errorMessageMode?: ErrorMessageMode
  successMessageMode?: SuccessMessageMode
}

export { ApiConfig, RequestParams };
