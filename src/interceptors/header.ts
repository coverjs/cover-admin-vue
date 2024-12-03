import type { Context, Middleware } from 'onion-interceptor';

import { lang } from '@/locales';
import { useUserStore } from '@/store';
import { getReqOptItem } from '@/utils';
import { assign, isEmpty } from 'lodash-es';

interface AssignHeadersParams {
  ctx: Context // 请求上下文，包含配置信息和当前请求的状态
  key: string // 要分配的头信息的键名
  conditions: () => boolean // 判断是否分配头信息的条件函数，返回布尔值
  callback: () => string // 当条件满足时，用于生成头信息值的回调函数
}
/**
 * 根据条件为请求上下文中分配 HTTP 头信息
 * @param params 包含分配头信息所需参数的对象
 */
function assignHeaders(params: AssignHeadersParams) {
  const { ctx, key, conditions, callback } = params;

  if (conditions()) {
    ctx.cfg!.headers = assign(ctx.cfg?.headers, {
      [key]: callback()
    });
  }
}

/**
 * 请求头拦截器
 * 用于在请求发送前，添加必要的请求头信息，如认证令牌和语言设置
 * @param {Context} ctx - Koa框架的上下文对象，包含请求和响应的相关信息
 * @param {Function} next - Koa框架的中间件链中下一个中间件的执行函数
 * @returns {Promise<void>} - 异步函数，无返回值
 */
export const headerInterceptor: Middleware = async function (ctx, next) {
  if (!getReqOptItem(ctx, 'headerInterceptorEnabled'))
    return await next();

  const userStore = useUserStore();
  const token = userStore.getToken;

  // 设置 token
  assignHeaders({
    ctx,
    key: 'Authorization',
    conditions: () => getReqOptItem(ctx, 'withToken') && token,
    callback: () => `Bearer ${token}`,
  });

  // 设置语言
  assignHeaders({
    ctx,
    key: 'lang',
    conditions: () => !isEmpty(lang.value),
    callback: () => lang.value,
  });

  await next();
};
