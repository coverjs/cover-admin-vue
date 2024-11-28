import type { Router } from 'vue-router';
import { AxiosCanceler } from '@/interceptors';
import { Modal, notification } from 'ant-design-vue';
import nProgress from 'nprogress';
import { createPermissionGuard } from './permission';

export function setupRouterGuards(router: Router) {
  createPageGuard(router);
  createHttpGuard(router);
  createPermissionGuard(router);
  createMessageGuard(router);
  createProgressGuard(router);
  createRouteChangeGuard(router);
}

function createPageGuard(router: Router) {
  const loadedPage = new Map<string, boolean>();
  router.beforeEach(async to => {
    to.meta.loaded = loadedPage.has(to.path);
    return true;
  });

  router.afterEach(to => {
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

function createProgressGuard(router: Router) {
  router.beforeEach(async to => {
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

function createMessageGuard(router: Router) {
  router.beforeEach(async () => {
    try {
      Modal.destroyAll();
      notification.destroy();
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
    catch (_) {
      /** nothing */
    }
  });
}

function createRouteChangeGuard(router: Router) {
  router.beforeEach(async to => {
    if (to.path === '/') {
      return '/home';
    }
  });
}
