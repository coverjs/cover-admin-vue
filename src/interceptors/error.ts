import type { ErrorMessageMode } from '@/types'
import type { Context, Middleware } from 'onion-interceptor'

import { StatusEnum } from '@/enums'
import { useLogoutConfirm, useMessage } from '@/hooks'
import { t } from '@/locales'
import { getReqOptItem } from '@/utils'
import { tap } from '@onion-interceptor/pipes'
import { AxiosError, isAxiosError, isCancel } from 'axios'
import { get, isEqual, isNil } from 'lodash-es'

const statusHandlers = new Map<
  number,
  (msg?: string) => string | false | void
>()
statusHandlers.set(
  StatusEnum.BAD_REQUEST,
  (msg?: string) => msg || t('fallback.http.badRequest'),
)
statusHandlers.set(StatusEnum.UNAUTHORIZED, () => {
  const logout = useLogoutConfirm('auto')
  logout()
  return false
})
statusHandlers.set(
  StatusEnum.FORBIDDEN,
  (msg?: string) => msg || t('fallback.http.forbidden'),
)
statusHandlers.set(
  StatusEnum.NOT_FOUND,
  (msg?: string) => msg || t('fallback.http.notFound'),
)
statusHandlers.set(
  StatusEnum.TIMEOUT,
  (msg?: string) => msg || t('fallback.http.requestTimeout'),
)
statusHandlers.set(
  StatusEnum.INTERNAL_SERVER_ERRO,
  (msg?: string) => msg || t('fallback.http.internalServerError'),
)
const _getCode = (ctx: Context) => get(ctx, ['res', 'data', 'code'])
function _getErrMsg(ctx: Context) {
  return get(ctx, ['res', 'data', 'msg']) ?? get(ctx, ['res', 'statusText'])
}

/**
 * 错误拦截器中间件
 *
 * @param ctx 上下文对象，包含请求和响应信息
 * @param next 中间件执行函数
 */
export const errorInterceptor: Middleware = async function (ctx, next) {
  // 禁用error拦截器
  if (!getReqOptItem(ctx, 'errorInterceptorEnabled'))
    return await next()

  await next(
    tap(
      (ctx) => {
        if (isEqual(_getCode(ctx), 0))
          return

        throw new Error(_getErrMsg(ctx))
      },
      (err) => {
        if (isCancel(err))
          return err
        return handleError(ctx, err as Error)
      },
    ),
  )
}

/**
 * 处理请求错误
 *
 * @param ctx 上下文对象，包含请求和响应信息
 * @param error 错误对象，可能是AxiosError或普通Error类型
 * @returns 返回错误对象
 */
function handleError(ctx: Context, error: Error) {
  const code = get(error, 'code')
  const errorMessageMode = getReqOptItem(ctx, 'errorMessageMode')

  if (isAxiosError(error) && isEqual(code, AxiosError.ECONNABORTED)) {
    callMsg(t('fallback.http.requestTimeout'), errorMessageMode)
    return error
  }

  if (isAxiosError(error) && isEqual(code, AxiosError.ERR_NETWORK)) {
    callMsg(t('fallback.http.networkError'), errorMessageMode)
    return error
  }

  const status
    = get(ctx, ['res', 'status']) ?? get(error, ['response', 'status'])

  const _status = isEqual(status, StatusEnum.SUCCESS) // 兼容 http status 200 ,但是后端传错误码的情况
    ? (_getCode(ctx) ?? StatusEnum.SUCCESS)
    : status

  !isNil(_status) && checkStatus(_status, _getErrMsg(ctx), errorMessageMode)
  return error
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
  const handleRes = statusHandlers.get(status)?.(msg)
  if (isEqual(status, StatusEnum.SUCCESS) || handleRes === false)
    return

  callMsg(
    handleRes ?? msg ?? t('fallback.http.internalServerError'),
    errorMessageMode,
  )
}

/**
 * 根据错误消息和错误消息模式，显示错误信息
 *
 * @param errMsg 错误消息文本，用于在界面上展示错误信息
 * @param errorMessageMode 错误消息模式，决定使用哪种方式展示错误信息，可选值为'modal'或'message'
 */
function callMsg(errMsg: string, errorMessageMode: ErrorMessageMode) {
  const { createMessage, createErrorModal } = useMessage()

  if (errMsg && errorMessageMode === 'modal') {
    createErrorModal({ title: t('common.error'), content: errMsg })
    return
  }

  if (errMsg && errorMessageMode === 'message') {
    createMessage.error({
      content: errMsg,
      key: `global_error_message_status_${status}`,
    })
  }
}
