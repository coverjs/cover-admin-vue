import type { Context, Middleware } from 'onion-interceptor';
import type { ErrorMessageMode } from '@/types';
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

/**
 * 错误拦截器中间件
 *
 * @param ctx 上下文对象，包含请求和响应信息
 * @param next 中间件执行函数
 */
export const errorInterceptor: Middleware = async function (ctx, next) {
  // 禁用error拦截器
  if (!getReqOptItem(ctx, 'errorInterceptorEnabled')) return await next();

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
          const userStore = useUserStore();
          logout = () => userStore?.logout();

          return handleError(ctx, err as Error);
        } catch (_e) {
          return _e;
        }
      },
    ),
  );
};

/**
 * 处理请求错误
 *
 * @param ctx 上下文对象，包含请求和响应信息
 * @param error 错误对象，可能是AxiosError或普通Error类型
 * @returns 返回错误对象
 */
function handleError(ctx: Context, error: Error) {
  const code = get(error, 'code');
  const errorMessageMode = getReqOptItem(ctx, 'errorMessageMode');

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

/**
 * 检查并处理HTTP请求状态
 *
 * @param status HTTP状态码，用于判断请求的结果
 * @param msg 伴随状态码一起返回的消息，可能包含具体的错误信息
 * @param errorMessageMode 错误消息的显示模式，默认为'message'，支持不同的显示方式
 */
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

/**
 * 根据错误消息和错误消息模式，显示错误信息
 *
 * @param errMsg 错误消息文本，用于在界面上展示错误信息
 * @param errorMessageMode 错误消息模式，决定使用哪种方式展示错误信息，可选值为'modal'或'message'
 */
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
