import type { App } from "vue";

import { createRouter, createWebHashHistory } from "vue-router";
import { DataLoaderPlugin } from "unplugin-vue-router/data-loaders";
import { routes } from "vue-router/auto-routes";

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export function setupRouter(app: App) {
  app.use(DataLoaderPlugin, { router }).use(router);
}
