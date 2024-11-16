import type { Context, Middleware } from 'onion-interceptor';
import type { RequestParams, ErrorMessageMode } from '@/types';
import { AxiosError } from 'axios';

import { tap } from '@onion-interceptor/pipes';
import { getReqOptItem } from '@/utils';
import { useMessage } from '@/hooks';
import { useUserStore } from '@/store';
import { t } from '@/locales';
import { StatusEnum } from '@/enums';
import { isCancel, isAxiosError } from 'axios';
import { isNil, get, isEqual } from 'lodash-es';

let logout: () => void | void; // 拦截器周期外取不到  store 中的值

const statusHandlers = new Map<number, (msg?: string) => string | void>();
statusHandlers.set(
  StatusEnum.BAD_REQUEST,
  (msg?: string) => msg || t('fallback.http.badRequest'),
);
statusHandlers.set(StatusEnum.UNAUTHORIZED, (msg?: string) => {
  const result = msg || t('fallback.http.unauthorized');
  logout?.();
  return result;
});
statusHandlers.set(
  StatusEnum.FORBIDDEN,
  (msg?: string) => msg || t('fallback.http.forbidden'),
);
statusHandlers.set(
  StatusEnum.NOT_FOUND,
  (msg?: string) => msg || t('fallback.http.notFound'),
);
statusHandlers.set(
  StatusEnum.TIMEOUT,
  (msg?: string) => msg || t('fallback.http.requestTimeout'),
);
statusHandlers.set(
  StatusEnum.INTERNAL_SERVER_ERRO,
  (msg?: string) => msg || t('fallback.http.internalServerError'),
);

export const errorInterceptor: Middleware = async function (ctx, next) {
  const [requestParams] = ctx.args! as [RequestParams];

  // 禁用error拦截器
  if (!getReqOptItem(requestParams, 'errorInterceptorEnabled')) {
    return await next();
  }

  await next(
    tap(
      ctx => {
        const code = ctx.res?.data.code;
        if (code === 0) return;

        throw new Error(ctx.res?.data?.msg ?? ctx.res?.statusText);
      },
      err => {
        if (isCancel(err)) return err;

        try {
          const errorMessageMode: ErrorMessageMode =
            requestParams.customOptions?.errorMessageMode ??
            ctx!.cfg?.customOptions.errorMessageMode;

          const userStore = useUserStore();
          logout = () => userStore?.logout();

          return handleError(ctx, err as Error, errorMessageMode);
        } catch (_e) {
          return _e;
        }
      },
    ),
  );
};

function handleError(
  ctx: Context,
  error: AxiosError | Error,
  errorMessageMode: ErrorMessageMode,
) {
  const code = get(error, 'code');

  if (isAxiosError(error) && isEqual(code, AxiosError.ECONNABORTED)) {
    callMsg(t('fallback.http.requestTimeout'), errorMessageMode);
    return error;
  }

  if (isAxiosError(error) && isEqual(code, AxiosError.ERR_NETWORK)) {
    callMsg(t('fallback.http.networkError'), errorMessageMode);
    return error;
  }

  const status = ctx?.res?.status ?? (error as AxiosError)?.response?.status;
  const errMsg = ctx.res?.data?.msg ?? ctx.res?.statusText;

  const _status = isEqual(status, StatusEnum.SUCCESS) // 兼容 http status 200 ,但是后端传错误码的情况
    ? get(ctx, ['res', 'data', 'code'], StatusEnum.SUCCESS)
    : status;

  !isNil(_status) && checkStatus(_status, errMsg, errorMessageMode);
  return error;
}

function checkStatus(
  status: number,
  msg: string,
  errorMessageMode: ErrorMessageMode = 'message',
) {
  if (isEqual(status, StatusEnum.SUCCESS)) return;

  callMsg(
    statusHandlers.get(status)?.(msg) ??
      msg ??
      t('fallback.http.internalServerError'),
    errorMessageMode,
  );
}

function callMsg(errMsg: string, errorMessageMode: ErrorMessageMode) {
  const { createMessage, createErrorModal } = useMessage();

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
