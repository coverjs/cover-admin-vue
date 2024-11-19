import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router/auto';
import { setupRouterGuards } from './guard';
import staticRoutes from './staticRoutes.ts';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

export function setupRouter(app: App) {
  setupRouterGuards(router);
  app.use(router);
}
