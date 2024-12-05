import type { NormalResponse, Response } from '@/types';
import type { Context, Middleware } from 'onion-interceptor';
import { getReqOptItem } from '@/utils';

function getRes(ctx: Context) {
  return ctx.res?.data as unknown as NormalResponse;
}

export const responseInterceptor: Middleware<Context, Response> = async function (ctx, next) {
  const resMode = getReqOptItem(ctx as unknown as Context, 'responseMode');

  if (resMode === 'object' || resMode === 'array') {
    try {
      await next();
      const res = getRes(ctx);
      return resMode === 'object'
        ? { err: void 0, res }
        : [void 0, res];
    }
    catch (err) {
      return resMode === 'object'
        ? { err: err as Error, res: void 0 }
        : [err as Error, void 0];
    }
  }

  // if (resMode === 'reactive') {
  //   const immediate = getReqOptItem(ctx, 'requestImmediate');
  //   return useAsyncState<NormalResponse>(async () => {
  //     await next();
  //     return ctx.res?.data;
  //   }, { data: {}, code: 0, msg: '' }, { immediate });
  // }

  // mode = 'normal'
  await next();
  return getRes(ctx);
};
