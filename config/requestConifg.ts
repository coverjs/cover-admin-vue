import type { ApiConfig, CustomRequestOptions } from '@/types'
import { ContentTypeEnum, TimeEnum } from '@/enums'

export const defaultCustomRequestOptions: CustomRequestOptions = {
  // 是否开启loading拦截器
  loadingInterceptorEnabled: false,
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
} as const

export const defaultRequestConfig: ApiConfig = {
  baseURL: import.meta.env.VITE_GLOB_API_URL,
  timeout: 10 * TimeEnum.SECOND,
  headers: { 'Content-Type': ContentTypeEnum.Json },
  customOptions: defaultCustomRequestOptions,
} as const
