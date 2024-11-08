import type { CustomRequestOptions, RequestParams } from '@/types';

import { defaultCustomRequestOptions } from '@config';

export function getReqOptItem(
  params: RequestParams,
  key: keyof CustomRequestOptions,
) {
  return !!(params?.customOptions?.[key] ?? defaultCustomRequestOptions[key]);
}
