import { authInterceptor } from "./auth";
import { errorInterceptor } from "./error";
import { loadingInterceptor } from "./loading";
import { cancelInterceptor } from "./cancel";

export const interceptors = [
  errorInterceptor,
  cancelInterceptor,
  authInterceptor,
  loadingInterceptor,
];

export * from "./auth";
export * from "./error";
export * from "./loading";
export * from "./cancel";
