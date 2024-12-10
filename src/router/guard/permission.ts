import type { Router } from 'vue-router';

import { PageEnum } from '@/enums';
import { useAppStore, useUserStore } from '@/store';
import { genLoginRoteLocation } from '@/utils';
import { isEmpty, omit } from 'lodash-es';

export function createPermissionGuard(router: Router) {
  const userStore = useUserStore();
  const appStore = useAppStore();

  router.beforeEach(async (to, _from, next) => {
    const token = userStore.getToken;
    to.meta.pageStatus = 0;

    if (!token && !to.meta.ignoreAuth) {
      const location = genLoginRoteLocation(to);
      next(location);
      return;
    }

    if (to.name === 'login' && token) {
      next(PageEnum.BASE_HOME);
      return;
    }

    if (
      isEmpty(userStore.userInfo)
      && !to.meta.ignoreAuth
      && to.meta.pageStatus === 0
    ) {
      try {
        await userStore.getUserInfoAction();
        const currentRoute = await appStore.generateDynamicRoutes();
        router.addRoute(currentRoute);
      }
      catch (e) {
        next(/** 正常展示 fallback 页面 */);
        to.meta.exception = !!e;
        to.meta.pageStatus = 500;
        return;
      }

      next({
        ...omit(to, 'name'),
        replace: true,
      });
      return;
    }

    if (to.path === '/403') {
      to.meta.pageStatus = 403;
    }

    next();
  });
}
