import { PageEnum } from '@/enums';
import { setupLayouts } from 'virtual:generated-layouts';
import { routes } from 'vue-router/auto-routes';

const staticRoutesPaths = new Set<string>();
staticRoutesPaths.add(PageEnum.BASE_INDEX);
staticRoutesPaths.add(PageEnum.BASE_LOGIN);
staticRoutesPaths.add(PageEnum.BASE_HOME);
staticRoutesPaths.add('/:path(.*)');

export function genRoutes() {
  const result = setupLayouts(routes).filter(route => staticRoutesPaths.has(route.path));

  const redirectPage = {
    title: 'redirect',
    path: '/redirect',
    component: () => import('@/layouts/default.vue'),
    name: 'RedirectTo',
    meta: {
      title: 'Redirect',
      hideBreadcrumb: true,
      hideMenu: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)/:_redirect_type(.*)/:_origin_params(.*)?',
        name: 'Redirect',
        component: () => import('@/pages/system/redirect.vue'),
        meta: {
          title: 'Redirect',
          hideBreadcrumb: true,
        },
      },
    ],
  };

  result.push(redirectPage);
  // 对静态路由的其他操作可以写在这里
  return result;
}

export default genRoutes();
