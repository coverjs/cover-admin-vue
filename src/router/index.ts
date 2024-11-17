import type { App } from 'vue';

import { createRouter, createWebHashHistory } from 'vue-router/auto';
import  staticRoutes from './static-routes.ts';
import { setupRouterGuards } from './guard';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutes,
});

export function setupRouter(app: App) {
  setupRouterGuards(router);
  app.use(router);
}

