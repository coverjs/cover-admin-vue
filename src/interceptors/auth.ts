import type { Middleware } from 'onion-interceptor';

import { getReqOptItem } from '@/utils';
import { useUserStore } from '@/store';
import { assign } from 'lodash-es';

export const authInterceptor: Middleware = async function (ctx, next) {
  if (!getReqOptItem(ctx, 'authInterceptorEnabled')) return await next();

  const userStore = useUserStore();
  const token = userStore.getToken;

  if (token && getReqOptItem(ctx, 'withToken')) {
    ctx.cfg!.headers = assign(ctx.cfg!.headers, {
      Authorization: `Bearer ${token}`,
    });
  }
  await next();
};
