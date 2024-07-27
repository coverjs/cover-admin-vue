import type { Middleware } from "onion-interceptor";
export const errorInterceptor: Middleware = async function errorInterceptor(
  ctx,
  next
) {
  console.log("errorInterceptor start", ctx);
  try {
    await next();
  } catch (error) {
    console.log(error);
    throw Promise.reject(error);
  } finally {
    console.log("errorInterceptor end", ctx);
  }
};
