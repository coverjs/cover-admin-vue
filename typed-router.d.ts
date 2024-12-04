/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...path]': RouteRecordInfo<'/[...path]', '/:path(.*)', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    '/home': RouteRecordInfo<'/home', '/home', Record<never, never>, Record<never, never>>,
    'login': RouteRecordInfo<'login', '/login', Record<never, never>, Record<never, never>>,
    '/system/menu/': RouteRecordInfo<'/system/menu/', '/system/menu', Record<never, never>, Record<never, never>>,
    '/system/menu/MenuDrawer': RouteRecordInfo<'/system/menu/MenuDrawer', '/system/menu/MenuDrawer', Record<never, never>, Record<never, never>>,
    'Redirect': RouteRecordInfo<'Redirect', '/system/redirect', Record<never, never>, Record<never, never>>,
    '/system/role': RouteRecordInfo<'/system/role', '/system/role', Record<never, never>, Record<never, never>>,
    '/system/user/': RouteRecordInfo<'/system/user/', '/system/user', Record<never, never>, Record<never, never>>,
    '/system/user/UserDrawer': RouteRecordInfo<'/system/user/UserDrawer', '/system/user/UserDrawer', Record<never, never>, Record<never, never>>,
  }
}
