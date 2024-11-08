import type { CustomRequestOptions, RequestParams } from '@/types';

import { defaultCustomRequestOptions as DEFAULT } from '@config';

export const getReqOptItem = (
  params: RequestParams,
  key: keyof CustomRequestOptions,
) => !!(params?.customOptions?.[key] ?? DEFAULT[key]);
