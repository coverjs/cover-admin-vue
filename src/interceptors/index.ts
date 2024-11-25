import { authInterceptor } from './auth';
import { errorInterceptor } from './error';
import { loadingInterceptor } from './loading';
import { cancelInterceptor } from './cancel';
import { langInterceptor } from './lang';

export const interceptors = [
	errorInterceptor,
	cancelInterceptor,
	authInterceptor,
	langInterceptor,
	loadingInterceptor,
];

export * from './auth';
export * from './error';
export * from './loading';
export * from './cancel';
export * from './lang';
