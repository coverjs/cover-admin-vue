import type { LocationQuery, ParamValue, RouteMeta } from 'vue-router';

export interface PageTagItem {
  title: string
  name: string
  path: string
  fullPath: string
  meta: RouteMeta
  query: LocationQuery
  params: Record<never, never> | { path: ParamValue<false> }
}
