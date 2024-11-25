import { authInterceptor } from './auth';
import { cancelInterceptor } from './cancel';
import { errorInterceptor } from './error';
import { langInterceptor } from './lang';
import { loadingInterceptor } from './loading';

export const interceptors = [
  errorInterceptor,
  cancelInterceptor,
  authInterceptor,
  langInterceptor,
  loadingInterceptor,
];

export * from './auth';
export * from './cancel';
export * from './error';
export * from './lang';
export * from './loading';
