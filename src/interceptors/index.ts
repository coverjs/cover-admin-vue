import { cancelInterceptor } from './cancel';
import { errorInterceptor } from './error';
import { headerInterceptor } from './header';
import { loadingInterceptor } from './loading';

export const interceptors = [
  errorInterceptor,
  cancelInterceptor,
  headerInterceptor,
  loadingInterceptor,
];

export * from './cancel';
export * from './error';
export * from './loading';
