import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';

export function genLoginRoteLocation(originRoute: RouteLocationNormalized) {
  return {
    name: 'login',
    replace: true,
    query: {
      redirect: originRoute.fullPath,
      redirectQuery: JSON.stringify(originRoute.query),
    },
  } as unknown as RouteLocationRaw;
}
