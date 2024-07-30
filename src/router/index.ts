import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

import { createRouter, createWebHashHistory } from "vue-router";

const publicRoute: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../pages/home/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { ignoreAuth: true, layout: "login" },
    component: () => import("../pages/sys/login/index.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoute,
});

export function setupRouter(app: App) {
  app.use(router);
}
