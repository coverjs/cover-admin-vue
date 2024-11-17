import { type AccountLoginDto, api } from '@/services';
import { router } from '@/router';
import { PageEnum } from '@/enums';
import { store } from '.';
import { each, get, set } from 'lodash-es';
import { rootRoute } from '@/router/static-routes.ts';
import { generateMenuAndRoutes } from '@/router/dynamic-routes.ts';
import { MenuData } from '@/router/types.ts';

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string | void>('');
    const userInfo = reactive({});
    const routerData = shallowRef();
    const menuData = shallowRef<MenuData>([]);

    const getToken = computed(() => token.value);

    function setToken(value: string | void) {
      token.value = value;
    }

    async function login(data: AccountLoginDto, goHome: boolean = true) {
      const { data: res } = await api.auth.login(data, {
        customOptions: {
          authInterceptorEnabled: false,
        },
      });
      if (res.code === 0) {
        setToken(res.data!.token);
        await afterLoginAction(goHome);
      }
      return userInfo;
    }

    function logout() {
      setToken(void 0);
      router.replace(PageEnum.BASE_LOGIN);
    }

    async function afterLoginAction(goHome?: boolean) {
      if (!getToken.value) return;

      await getUserInfoAction();
      const routes = await generateDynamicRoutes();
      router.addRoute(routes);

      goHome && (await router.replace(PageEnum.BASE_HOME));
    }

    async function getUserInfoAction() {
      if (!getToken.value) return;

      const { data: res } = await api.profile.findUserInfo();
      if (res.code === 0) {
        each(get(res, 'data'), (value, key) => {
          set(userInfo, key, value);
        });
      }
      return userInfo;
    }

    async function getMenuData() {
      const { data: res } = await api.profile.getMenus();
      return generateMenuAndRoutes(res.data);
    }

    const generateDynamicRoutes = async () => {
      const { menuData: treeMenuData, routeData: treeRouterData } = await getMenuData();
      menuData.value = treeMenuData;
      routerData.value = {
        ...rootRoute,
        children: treeRouterData,
      };
      return routerData.value;
    };

    return {
      token,
      userInfo,
      getToken,
      setToken,
      login,
      logout,
      afterLoginAction,
      getUserInfoAction,
      menuData,
      routerData,
      generateDynamicRoutes,
    };
  },
  { persist: { paths: ['token'] } },
);

export function useUserStoreWithOut() {
  return useUserStore(store);
}
