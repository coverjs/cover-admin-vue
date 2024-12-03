import { cancelInterceptor } from './cancel';
import { errorInterceptor } from './error';
import { headerInterceptor } from './header';
import { loadingInterceptor } from './loading';
import { responseInterceptor } from './response';

export const interceptors = [
  responseInterceptor,
  errorInterceptor,
  cancelInterceptor,
  headerInterceptor,
  loadingInterceptor,
];

export * from './cancel';
export * from './error';
export * from './header';
export * from './loading';
export * from './response';
