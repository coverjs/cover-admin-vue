import type { ApiConfig, CommonResponseVo, RequestParams } from '@/services';

export type ErrorMessageMode = 'none' | 'modal' | 'message' | void;
export type SuccessMessageMode = ErrorMessageMode;
export type ResponseMode = 'normal' | 'object' | 'array';

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

export type Response<Data = any> = NormalResponse<Data> | ObjectResponse<Data> | ArrayResponse<Data>;

export { ApiConfig, RequestParams };
