import type { Context, Middleware } from 'onion-interceptor';
import type { RequestParams, ErrorMessageMode } from '@/types';
import type { AxiosError } from 'axios';

import { tap } from '@onion-interceptor/pipes';
import { getReqOptItem } from '@/utils';
import { useMessage } from '@/hooks';
import { useUserStore } from '@/store';
import { t } from '@/locales';
import { isCancel } from 'axios';
import { isNil, get } from 'lodash-es';

let logout: () => void | void;
const { createMessage, createErrorModal } = useMessage();
const msgMap = new Map();

msgMap.set(400, (msg?: string) => msg || t('fallback.http.badRequest'));
msgMap.set(401, (msg?: string) => {
  const res = msg || t('fallback.http.unauthorized');
  logout?.();
  return res;
});
msgMap.set(403, (msg?: string) => msg || t('fallback.http.forbidden'));
msgMap.set(404, (msg?: string) => msg || t('fallback.http.notFound'));
msgMap.set(408, (msg?: string) => msg || t('fallback.http.requestTimeout'));
msgMap.set(
  500,
  (msg?: string) => msg || t('fallback.http.internalServerError'),
);

export const errorInterceptor: Middleware = async function (ctx, next) {
  const [requestParams] = ctx.args! as [RequestParams];
  const errorMessageMode: ErrorMessageMode =
    requestParams.customOptions?.errorMessageMode ??
    ctx!.cfg?.customOptions.errorMessageMode;

  const userStore = useUserStore();
  logout = () => userStore?.logout();

  // 禁用error拦截器
  if (!getReqOptItem(requestParams, 'errorInterceptorEnabled')) {
    return await next();
  }

  await next(
    tap(
      ctx => {
        const code = ctx.res?.data.code;
        if (code === 0) return;
        if (!isNil(code) && code >= 400 && code <= 500) {
          checkStatus(
            code,
            ctx.res?.data?.msg ?? ctx.res?.statusText,
            errorMessageMode,
          );
        }
        const errMsg = ctx.res?.data.msg;
        callMsg(errMsg, errorMessageMode);
        throw new Error(errMsg ?? ctx.res!.statusText);
      },
      err => {
        if (isCancel(err)) return err;
        try {
          return handleError(ctx, err as AxiosError, errorMessageMode);
        } catch (_e) {
          return _e as unknown as string;
        }
      },
    ),
  );
};

function handleError(
  ctx: Context,
  error: AxiosError,
  errorMessageMode: ErrorMessageMode,
) {
  const code = get(error, 'code');
  const message = get(error, 'message')! as string;
  const status = ctx?.res?.status ?? (error as AxiosError)?.response?.status;

  if (code === 'ECONNABORTED' || message?.includes('timeout')) {
    callMsg(t('fallback.http.requestTimeout'), errorMessageMode);
    return error;
  }

  if (code === 'ERR_NETWORK' || error?.toString().includes('Network Error')) {
    callMsg(t('fallback.http.networkError'), errorMessageMode);
    return error;
  }

  if (!isNil(status) && status >= 400 && status <= 500) {
    checkStatus(
      status,
      ctx.res?.data?.msg ?? ctx.res?.statusText,
      errorMessageMode,
    );
  }
  return error;
}

function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
) {
  let errMsg = '';
  errMsg = msgMap.get(status)?.(msg) ?? t('fallback.http.internalServerError');

  callMsg(errMsg, errorMessageMode);
}

function callMsg(errMsg: string, errorMessageMode: ErrorMessageMode) {
  if (errMsg && errorMessageMode === 'modal') {
    createErrorModal({ title: t('common.error'), content: errMsg });
    return;
  }

  if (errMsg && errorMessageMode === 'message') {
    createMessage.error({
      content: errMsg,
      key: `global_error_message_status_${status}`,
    });
  }
}
