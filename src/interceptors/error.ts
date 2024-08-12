import type { Middleware } from "onion-interceptor";
import type { RequestParams, ErrorMessageMode } from "@/types";

import { tap } from "@onion-interceptor/pipes";
import { getReqOptItem } from "@/utils";
import { useMessage } from "@/hooks";
import { useUserStoreWithOut } from "@/store";
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
          if (errorMessageMode === "modal") {
            createErrorModal({ title: "错误", content: ctx.res?.data.msg });
          }
          if (errorMessageMode === "message") {
            createMessage.error(ctx.res?.data.msg);
          }
          throw new Error(ctx.res?.data.msg ?? ctx.res!.statusText);
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
          if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
            errMsg = "请求超时";
          }
          if (errMsg && errorMessageMode === "modal") {
            createErrorModal({ title: "错误", content: errMsg });
          }
          if (errMsg && errorMessageMode === "message") {
            createMessage.error(errMsg);
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
msgMap.set(400, (msg: string) => msg);
function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = "message"
) {
  const userStore = useUserStoreWithOut();

  let errMsg = "";

  msgMap.set(401, (msg: string) => {
    userStore.setToken(void 0);
    const res = msg || "登录过期，请重新登录";
    // logout 逻辑
    return res;
  });

  errMsg = msgMap.get(status)?.(msg) ?? msg;

  if (errMsg && errorMessageMode === "modal") {
    createErrorModal({ title: "错误提示", content: errMsg });
    return;
  }
  if (errMsg && errorMessageMode === "message") {
    createMessage.error({
      content: errMsg,
      key: `global_error_message_status_${status}`,
    });
  }
}
