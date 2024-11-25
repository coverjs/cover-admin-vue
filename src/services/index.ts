import { Api, type ApiConfig } from './api';
import { interceptors } from '@/interceptors';
import { defaultRequestConfig } from '@config';
import { createInterceptor } from 'onion-interceptor';

import objHash from 'object-hash';

const apis: Map<string, Api<unknown>> = new Map();

export function createApi(config: ApiConfig = defaultRequestConfig) {
	const key = objHash(config);

	if (apis.has(key)) return apis.get(key)!;

	const api = new Api(config);

	createInterceptor(api.instance).use(...interceptors);

	apis.set(key, api);
	return api;
}

export * from './api';

export const api = createApi();
