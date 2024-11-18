import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router/auto';
import  staticRoutes from './staticRoutes.ts';
import { setupRouterGuards } from './guard';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

export function setupRouter(app: App) {
  setupRouterGuards(router);
  app.use(router);
}

