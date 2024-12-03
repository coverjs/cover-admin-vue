import type { ApiConfig, CommonResponseVo, RequestParams } from '@/services';
import type { UseAsyncStateReturnBase } from '@vueuse/core';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | void;
export type SuccessMessageMode = ErrorMessageMode;
export type ResponseMode = 'normal' | 'reactive' | 'object' | 'array';

export interface CustomRequestOptions {
  loadingInterceptorEnabled?: boolean
  errorInterceptorEnabled?: boolean
  headerInterceptorEnabled?: boolean
  ignoreCancelToken?: boolean
  withToken?: boolean
  errorMessageMode?: ErrorMessageMode
  successMessageMode?: SuccessMessageMode
  responseMode?: ResponseMode
  requestImmediate?: boolean // just responstMode is 'reactive' can be used
}

export interface NormalResponse<Data = any> extends CommonResponseVo {
  data: Data
  [key: string]: any
};

export interface ObjectResponse<Data = any> {
  res?: NormalResponse<Data>
  err?: Error
};

export type ArrayResponse<Data = any> = [Error | void, NormalResponse<Data> | void];

export type ReactiveResponse<Data = any> = UseAsyncStateReturnBase<NormalResponse<Data>, any[], boolean>;

export type Response = NormalResponse | ObjectResponse | ArrayResponse | ReactiveResponse;

export { ApiConfig, RequestParams };
