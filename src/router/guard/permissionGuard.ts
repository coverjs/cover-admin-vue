import type { Router } from "vue-router";
import { useUserStoreWithOut } from "@/store";
export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();

  router.beforeEach(async (to, _from, next) => {
    const token = userStore.getToken;

    if (!token) {
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      next({
        path: "/login",
        replace: true,
      });
      return;
    }

    next();
  });
}
