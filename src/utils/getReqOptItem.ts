import type { CustomRequestOptions, RequestParams } from '@/types';
import type { Context } from 'onion-interceptor';

import { defaultCustomRequestOptions as DEFAULT } from '@config';
import { get } from 'lodash-es';

function _getVal(obj: Record<string, any> | void, key: keyof CustomRequestOptions) {
  return get(obj, ['customOptions', key]);
}
export function getReqOptItem(ctx: Context, key: keyof CustomRequestOptions) {
  const [params] = ctx?.args as [RequestParams];
  const config = ctx?.cfg;

  return _getVal(params, key) ?? _getVal(config, key) ?? DEFAULT[key];
}
