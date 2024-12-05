import type { CommonResponseVo } from '@/services';
import type { UseAsyncStateOptions } from '@vueuse/core';
import { getReqOptItem } from '@/utils';

export function useRequest<Data, Shallow extends boolean>(
  api: () => Promise<CommonResponseVo & { data?: Data }>,
  initData: Data,
  options?: UseAsyncStateOptions<Shallow>
) {
  const immediate = getReqOptItem(void 0, 'requestImmediate');
  return useAsyncState(api, { code: 0, msg: '', data: initData }, { ...options, immediate });
}
