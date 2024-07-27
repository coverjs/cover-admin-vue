import type { Next, Middleware } from "onion-interceptor";
export const authInterceptor: Middleware = async function (ctx, next) {
  console.log("authInterceptor start", ctx);
  await next();
  console.log("authInterceptor end", ctx);
};

export class AuthInterceptor {
  async intercept(ctx: any, next: Next) {
    console.log("AuthInterceptor start", ctx);
    await next();
    console.log("AuthInterceptor end", ctx);
  }
}
