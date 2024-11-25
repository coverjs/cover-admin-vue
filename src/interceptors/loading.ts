import type { Middleware } from 'onion-interceptor';

import { getReqOptItem } from '@/utils';
import { finalize } from '@onion-interceptor/pipes';

export const loadingInterceptor: Middleware = async function (ctx, next) {
  // 禁用loading拦截器
  if (!getReqOptItem(ctx, 'loadingInterceptorEnabled'))
    return await next();

  console.log('loadingInterceptor start', ctx);
  await next(finalize(() => console.log('loadingInterceptor end', ctx)));
};
