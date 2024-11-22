import { RouteRecordRaw } from 'vue-router';
import { MenuData, MenuDataItem } from '@/router/types.ts';
import { t } from '@/locales';

export const basicRouteMap = {
  // 空页面 跳转 404
  ComponentError: () => import('@/pages/[...path].vue'),
};

const routerModules = import.meta.glob(['@/pages/**/*.vue']);

function checkEager(module: any) {
  if (typeof module === 'object' && 'default' in module) return module.default;

  return module;
}

export function getRouterModule(path?: string): any {
  if (!path) return basicRouteMap.ComponentError;
  // 判断开头是不是/
  if (path.startsWith('/')) path = path.slice(1);
  // 组装数据格式
  const fullPath = `/src/pages/${path}.vue`;
  const fullPathIndex = `/src/pages/${path}/index.vue`;

  if (fullPathIndex in routerModules) {
    return checkEager(routerModules[fullPathIndex]);
  }

  return checkEager(routerModules[fullPath]);
}

export function formatRoute(menu: MenuDataItem, parent?: MenuDataItem) {
  return {
    ...menu,
    component: getRouterModule(menu.path!),
    meta: {
      id: menu?.id,
      title: t(menu.locale!) || menu?.name,
      locale: menu.locale,
      originPath: parent?.path,
    },
  } as RouteRecordRaw;
}

export function genRoutes(
  menus: MenuDataItem[],
  parent?: MenuDataItem,
): RouteRecordRaw[] {
  const routesData: RouteRecordRaw[] = [];
  menus.forEach(menu => {
    const item = formatRoute(menu, parent);
    item.children = [];
    if (menu.children && menu.children.length) {
      item.children = genRoutes(menu.children, menu);
      if (menu.children?.length > 0 && menu.children[0].type === 'ACTION') {
        item.meta!['actions'] = menu.children;
        delete item.children;
      }
    }
    if (item.children?.length === 0) delete item.children;
    routesData.push(item);
  });
  return routesData;
}

/**
 * 请求后端的数据获取到的菜单的信息，默认数据是拉平的，需要对数据进行树结构的整理
 */
export function generateMenuAndRoutes(treeMenuData: any) {
  // 转变成路由
  const routeData = genRoutes(treeMenuData);

  const menuData = routeData as MenuData;
  return {
    routeData,
    menuData,
  };
}
