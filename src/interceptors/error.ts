import type { Middleware } from "onion-interceptor";
import type { RequestParams, ErrorMessageMode } from "@/types";

import { tap } from "@onion-interceptor/pipes";
import { getReqOptItem } from "@/utils";
import { useMessage } from "@/hooks";
import { useUserStore } from "@/store";
import { t } from "@/locales";
import { isCancel } from "axios";
import { isNil } from "lodash-es";

const { createMessage, createErrorModal } = useMessage();

export const errorInterceptor: Middleware = async function (ctx, next) {
  const [requestParams] = ctx.args! as [RequestParams];
  const errorMessageMode: ErrorMessageMode =
    requestParams.customOptions?.errorMessageMode ??
    ctx!.cfg?.customOptions.errorMessageMode;

  // 禁用error拦截器
  if (!getReqOptItem(requestParams, "errorInterceptorEnabled")) {
    return await next();
  }

  await next(
    tap(
      (ctx) => {
        const code = ctx.res?.data.code;
        if (code !== 0) {
          const errMsg = ctx.res?.data.msg;
          if (errorMessageMode === "modal") {
            createErrorModal({
              title: t("common.error"),
              content: errMsg,
            });
          }
          if (errorMessageMode === "message") {
            createMessage.error({
              content: errMsg,
              key: `global_error_message_${errMsg}`,
            });
          }
          throw new Error(errMsg ?? ctx.res!.statusText);
        }
      },
      (err: any) => {
        if (isCancel(err)) {
          return err;
        }
        const { code, message } = err || {};
        const status = ctx.res?.status;
        let errMsg = "";
        try {
          if (code === "ECONNABORTED" || message.includes("timeout")) {
            errMsg = t("fallback.http.requestTimeout");
          }
          if (
            code === "ERR_NETWORK" ||
            err?.toString().includes("Network Error")
          ) {
            errMsg = t("fallback.http.networkError");
          }

          if (errMsg && errorMessageMode === "modal") {
            createErrorModal({ title: t("common.error"), content: errMsg });
          }

          if (errMsg && errorMessageMode === "message") {
            createMessage.error({
              content: errMsg,
              key: `global_error_message_${errMsg}`,
            });
          }

          if (!isNil(status) && status >= 400 && status <= 500)
            checkStatus(
              status,
              ctx.res?.data.msg ?? ctx.res!.statusText,
              errorMessageMode
            );
          return err;
        } catch (_e) {
          return _e as unknown as string;
        }
      }
    )
  );
};

const msgMap = new Map();
let logout: () => void | void;

msgMap.set(400, (msg?: string) => msg || t("fallback.http.badRequest"));

msgMap.set(401, (msg?: string) => {
  const res = msg || t("fallback.http.unauthorized");
  logout?.();
  return res;
});

msgMap.set(403, (msg?: string) => msg || t("fallback.http.forbidden"));

msgMap.set(404, (msg?: string) => msg || t("fallback.http.notFound"));

msgMap.set(408, (msg?: string) => msg || t("fallback.http.requestTimeout"));

function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = "message"
) {
  let errMsg = "";
  const userStore = useUserStore();
  logout = () => userStore?.logout();
  errMsg = msgMap.get(status)?.(msg) ?? t("fallback.http.internalServerError");

  if (errMsg && errorMessageMode === "modal") {
    createErrorModal({ title: t("common.error"), content: errMsg });
    return;
  }
  if (errMsg && errorMessageMode === "message") {
    createMessage.error({
      content: errMsg,
      key: `global_error_message_status_${status}`,
    });
  }
}
