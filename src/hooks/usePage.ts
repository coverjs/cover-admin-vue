import type { Router } from 'vue-router';
import { set } from 'lodash-es';

/**
 * @description: redo current page
 */
export function useRedo(_router?: Router) {
  const { replace, currentRoute } = _router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise(resolve => {
      if (name === 'Redirect') {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        set(params, '_origin_params', JSON.stringify(params ?? {}));
        set(params, '_redirect_type', 'name');
        set(params, 'path', String(name));
      }
      else {
        set(params, '_redirect_type', 'path');
        set(params, 'path', fullPath);
      }
      replace({ name: 'Redirect', params, query }).then(() => resolve(true));
    });
  }
  return redo;
}
