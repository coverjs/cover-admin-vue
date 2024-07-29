import type { Middleware } from "onion-interceptor";
import type { RequestParams } from "@/types";

import { getReqOptItem } from "@/utils";
export const authInterceptor: Middleware = async function (ctx, next) {
  const [requestParams] = ctx.args! as [RequestParams];

  if (!getReqOptItem(requestParams, "authInterceptorEnabled")) {
    return await next();
  }

  console.log("authInterceptor start", ctx);
  await next();
  console.log("authInterceptor end", ctx);
};
