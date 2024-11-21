import type { RouteRecordRaw } from 'vue-router';

import { PageEnum } from '@/enums';
import { routes } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:generated-layouts';

const Layout = () => import('@/layouts/default.vue');

const staticRoutesPaths = new Set<string>();
staticRoutesPaths.add(PageEnum.BASE_INDEX);
staticRoutesPaths.add(PageEnum.BASE_LOGIN);
staticRoutesPaths.add(PageEnum.BASE_HOME);
staticRoutesPaths.add('/:path(.*)');

export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: '/',
  component: Layout,
  children: [],
};

export function genRoutes() {
  const result = setupLayouts(routes);
  // 对静态路由的其他操作可以写在这里
  return result.filter(route => staticRoutesPaths.has(route.path));
}

export default genRoutes();
