import type { GlobalToken } from 'ant-design-vue/es/theme';
import { kebabCase } from 'lodash-es';
import { canUseDom, updateCSS } from './dynamicCSS';

function formatKey(key: string, prefixCls: string) {
  return `${prefixCls}${kebabCase(key)}`;
}

/**
 * 将 token 注册为全局 CSS 变量
 * @param token - 主题 token
 */
export function registerTokenToCSSVar(token: GlobalToken) {
  if (!token)
    return;

  const PREFIX_CLS = '--cover-admin-';
  const UNIQUE_ID = 'cover-admin';

  // 生成 CSS 变量
  const cssVariables = Object.entries(token)
    .map(([key, value]) => `${formatKey(key, PREFIX_CLS)}: ${value};`)
    .join('\n');

  if (canUseDom()) {
    // 构建 CSS 内容并更新样式
    const cssText = `:root {\n${cssVariables}\n}`;
    updateCSS(cssText, UNIQUE_ID);
  }
}
