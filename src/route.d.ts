import 'vue-router'

declare module 'vue-router'{
  interface RouteMeta {
    title?: string
    id?: string | number
    actions?: any[]
    originPath?: string
  }
}
