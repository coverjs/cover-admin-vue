import { type AccountLoginDto, api, UserInfoVo } from '@/services';
import { router } from '@/router';
import { PageEnum } from '@/enums';
import { store, useAppStore } from '.';
import { each, get, set } from 'lodash-es';

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string | void>('');
    const userInfo = reactive<Partial<UserInfoVo>>({});
    const appStore = useAppStore();

    const getToken = computed(() => token.value);

    function setToken(value: string | void) {
      token.value = value;
    }

    async function login(data: AccountLoginDto, goHome: boolean = true) {
      const { data: res } = await api.auth.authLogin(data, {
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
      const routes = await appStore.generateDynamicRoutes();
      router.addRoute(routes);

      goHome && (await router.replace(PageEnum.BASE_HOME));
    }

    async function getUserInfoAction() {
      if (!getToken.value) return;

      const { data: res } = await api.profile.profileFindUserInfo();
      if (res.code === 0) {
        each(get(res, 'data'), (value, key) => {
          set(userInfo, key, value);
        });
      }
      return userInfo;
    }

    return {
      token,
      userInfo,
      getToken,
      setToken,
      login,
      logout,
      afterLoginAction,
      getUserInfoAction,
    };
  },
  { persist: { paths: ['token'] } },
);

export function useUserStoreWithOut() {
  return useUserStore(store);
}
