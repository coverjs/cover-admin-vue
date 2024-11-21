import type { Router } from 'vue-router';

import { useAppStore, useUserStore } from '@/store';
import { isEmpty, omit } from 'lodash-es';

export function createPermissionGuard(router: Router) {
  const userStore = useUserStore();
  const appStore = useAppStore();

  router.beforeEach(async (to, _from, next) => {
    const token = userStore.getToken;
    to.meta.exception = false;

    if (!token && !to.meta.ignoreAuth) {
      next({ name: 'login', replace: true });
      return;
    }

    if (to.name === 'login' && token) {
      next('/home');
      return;
    }

    if (
      isEmpty(userStore.userInfo) &&
      !to.meta.ignoreAuth &&
      !to.meta.exception
    ) {
      try {
        await userStore.getUserInfoAction();
        const currentRoute = await appStore.generateDynamicRoutes();
        router.addRoute(currentRoute);
        console.log(router.options.routes);
      } catch (e) {
        to.meta.exception = !!e;
        to.meta.exceptionCode = 500;
        next(e as Error);
        return;
      }

      next({
        ...omit(to, 'name'),
        replace: true,
      });
      return;
    }

    if (to.path === '/403') {
      to.meta.exception = true;
      to.meta.exceptionCode = 403;
    }

    next();
  });
}
