import type { Router } from 'vue-router';

import { useUserStore } from '@/store';
import { isEmpty } from 'lodash-es';

const allowList = ['/login', '/error', '/401', '/404', '/403'];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStore();

  router.beforeEach(async (to, _from, next) => {
    const token = userStore.getToken;
    to.meta.exception = false;

    if (!token && !allowList.includes(to.path)) {
      next({ name: 'login', replace: true });
      return;
    }

    if (to.name === 'login' && token) {
      next('/');
      return;
    }

    if (isEmpty(userStore.userInfo) && !allowList.includes(to.path)) {
      await userStore.getUserInfoAction();
      const currentRoute = await userStore.generateDynamicRoutes();
      router.addRoute(currentRoute);
      next({
        ...to,
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
