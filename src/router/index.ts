import type { RouteRecordRaw } from "vue-router";
import type { App } from "vue";

import { createRouter, createWebHashHistory } from "vue-router";
import layout from "../layouts/default/index.vue";

const publicRoute: RouteRecordRaw[] = [
  {
    path: "/",
    name: "root",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "login",
    meta: { ignoreAuth: true },
    component: () => import("../pages/sys/login/index.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: layout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../pages/home/index.vue"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoute,
});

export function setupRouter(app: App) {
  app.use(router);
}
