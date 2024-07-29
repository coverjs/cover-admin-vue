import type { Middleware } from "onion-interceptor";
import type { RequestParams } from "@/types";

import { catchError, finalize } from "@onion-interceptor/pipes";
import { getReqOptItem } from "@/utils";

export const errorInterceptor: Middleware = async function errorInterceptor(
  ctx,
  next
) {
  const [requestParams] = ctx.args! as [RequestParams];

  // 禁用error拦截器
  if (!getReqOptItem(requestParams, "errorInterceptorEnabled")) {
    return await next();
  }

  console.log("errorInterceptor start", ctx);
  await next(
    catchError((err) => {
      console.log("errorInterceptor catchError", err);
      return err;
    }),
    finalize(() => {console.log("errorInterceptor end", ctx) ;})
  );
};
