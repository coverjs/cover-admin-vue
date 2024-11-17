import type { RouteRecordRaw } from 'vue-router';


const Layout = () => import('@/layouts/default.vue')

export const rootRoute: RouteRecordRaw = {
  path: '/',
  name: '/',
  component: Layout,
  redirect: '/index',
  children: [],
};

export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    meta: {
      title: '找不到页面',
    },
    component: () => import('@/pages/[...path].vue'),
  },
] as RouteRecordRaw[];
