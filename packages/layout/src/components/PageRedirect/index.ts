import { set } from 'lodash-es';
import { unref } from 'vue';
import { type Router, type RouteRecordNameGeneric, useRouter } from 'vue-router';
import PageRedirect from './PageRedirect.vue';

export const REDIRECT_NAME = 'Redirect' as RouteRecordNameGeneric;

export function useRefreshPage(_router?: Router) {
  const { replace, currentRoute } = _router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise(resolve => {
      if (name === REDIRECT_NAME) {
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
      replace({ name: REDIRECT_NAME as any, params, query }).then(() => resolve(true));
    });
  }
  return redo;
}

export function genRedirectRoute(defaultLayout: () => Promise<any>) {
  return {
    title: 'redirect',
    path: '/redirect',
    component: defaultLayout,
    name: 'RedirectTo',
    meta: {
      title: 'Redirect',
      hideBreadcrumb: true,
      hideMenu: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)/:_redirect_type(.*)/:_origin_params(.*)?',
        name: REDIRECT_NAME,
        component: PageRedirect,
        meta: {
          title: 'Redirect',
          hideBreadcrumb: true,
        },
      },
    ],
  };
}

