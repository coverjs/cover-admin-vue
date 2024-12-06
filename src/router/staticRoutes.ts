import { PageEnum } from '@/enums';
import { genRedirectRoute } from '@lakyjs/components-vue-layout';
import { setupLayouts } from 'virtual:generated-layouts';
import { routes } from 'vue-router/auto-routes';

const staticRoutesPaths = new Set<string>();
staticRoutesPaths.add(PageEnum.BASE_INDEX);
staticRoutesPaths.add(PageEnum.BASE_LOGIN);
staticRoutesPaths.add(PageEnum.BASE_HOME);
staticRoutesPaths.add('/:path(.*)');

export function genRoutes() {
  const result = setupLayouts(routes).filter(route => staticRoutesPaths.has(route.path));

  result.push(genRedirectRoute(() => import('@/layouts/default.vue')));
  // 对静态路由的其他操作可以写在这里
  return result;
}

export default genRoutes();
