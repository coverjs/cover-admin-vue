import type { Middleware } from 'onion-interceptor';
import type { RequestParams } from '@/types';

import { finalize } from '@onion-interceptor/pipes';
import { getReqOptItem } from '@/utils';

export const loadingInterceptor: Middleware = async function (ctx, next) {
  const [requestParams] = ctx.args! as [RequestParams];

  // 禁用loading拦截器
  if (!getReqOptItem(requestParams, 'loadingInterceptorEnabled')) {
    return await next();
  }

  console.log('loadingInterceptor start', ctx);
  await next(finalize(() => console.log('loadingInterceptor end', ctx)));
};
