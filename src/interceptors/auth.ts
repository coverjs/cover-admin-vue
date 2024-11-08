import type { Middleware } from 'onion-interceptor';
import type { RequestParams } from '@/types';

import { getReqOptItem } from '@/utils';
import { useUserStore } from '@/store';
import { assign } from 'lodash-es';

export const authInterceptor: Middleware = async function (ctx, next) {
  const [requestParams] = ctx.args! as [RequestParams];

  if (!getReqOptItem(requestParams, 'authInterceptorEnabled')) {
    return await next();
  }

  const userStore = useUserStore();
  const token = userStore.getToken;

  if (token && getReqOptItem(requestParams, 'withToken')) {
    ctx.cfg!.headers = assign(ctx.cfg!.headers, {
      Authorization: `Bearer ${token}`,
    });
  }
  await next();
};
