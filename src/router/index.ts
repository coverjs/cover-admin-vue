import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../pages/home/index.vue"),
    },
  ] as RouteRecordRaw[],
});

export function setupRouter(app: App) {
  app.use(router);
}
