import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    id?: string | number
    actions?: any[]
    originPath?: string
    exception?: boolean
    exceptionCode?: 404 | 403 | 500
    locale?: string
    loaded?: boolean
    ignoreAuth?: boolean
  }
}
