import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    id?: string | number
    actions?: any[]
    originPath?: string
    pageStatus?: 404 | 403 | 500 | 0
    locale?: string
    loaded?: boolean
    ignoreAuth?: boolean
    roleCode?: string
  }
}
