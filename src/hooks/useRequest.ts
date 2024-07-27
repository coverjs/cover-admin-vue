import { Api } from "../services";
import { interceptors } from "../interceptors";
import { OnionInterceptor } from "onion-interceptor";

export default function useRequest() {
  const http = new Api({
    baseURL: "http://154.221.27.105:1118",
  });

  const onionInterceptor = new OnionInterceptor(http.instance);
  onionInterceptor.use(...interceptors);

  return http;
}
