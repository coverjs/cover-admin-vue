import type { Router } from "vue-router";
import { Modal, notification } from "ant-design-vue";
import { createPermissionGuard } from "./permission";
import { AxiosCanceler } from "@/interceptors";
import nProgress from "nprogress";

export function setupRouterGuards(router: Router) {
  createPageGuard(router);
  createHttpGuard(router);
  createPermissionGuard(router);
  createMessageGuard(router);
  createProgressGuard(router);
}

function createPageGuard(router: Router) {
  const loadedPage = new Map<string, boolean>();
  router.beforeEach(async (to) => {
    to.meta.loaded = loadedPage.has(to.path);

    return true;
  });

  router.afterEach((to) => {
    loadedPage.set(to.path, true);
  });
}

function createHttpGuard(router: Router) {
  const axiosCancel = new AxiosCanceler();
  router.beforeEach(async () => {
    axiosCancel.removeAllPending();
    return true;
  });
}

export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    nProgress.done();
    return true;
  });
}

export function createMessageGuard(router: Router) {
  router.beforeEach(async () => {
    try {
      Modal.destroyAll();
      notification.destroy();
    } catch (error) {}
  });
}
