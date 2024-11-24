import type { App } from 'vue'

import { createPersistedState } from 'pinia-plugin-persistedstate'

interface initStoreConfig {
  namespace: string
}

export const store = createPinia()

export function setupStore(app: App<Element>, options: initStoreConfig) {
  const { namespace } = options

  store.use(
    createPersistedState({
      key: id => `${namespace}:${id}`,
    }),
  )
  app.use(store)
}

export * from './app'
export * from './user'
