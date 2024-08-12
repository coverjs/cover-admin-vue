import type { App } from "vue";

import persistedstate from "pinia-plugin-persistedstate";

export const store = createPinia();
store.use(persistedstate);

export function setupStore(app: App<Element>) {
  app.use(store);
}

export * from "./user";
