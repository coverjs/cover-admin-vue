import type { App } from "vue";

import { createRouter, createWebHashHistory } from "vue-router/auto";
import { DataLoaderPlugin } from "unplugin-vue-router/data-loaders";
import { routes } from "vue-router/auto-routes";
import { setupLayouts } from "virtual:generated-layouts";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: setupLayouts(routes),
});

export function setupRouter(app: App) {
  app.use(DataLoaderPlugin, { router }).use(router);
}
