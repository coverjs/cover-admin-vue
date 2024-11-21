import { type AccountLoginDto, api, UserInfoVo } from '@/services';
import { router } from '@/router';
import { PageEnum, TimeEnum } from '@/enums';
import { waittingFor } from '@/utils';
import { store, useAppStore } from '.';
import { each, get, set, bind, isEmpty } from 'lodash-es';

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string | void>('');
    const userInfo = reactive<Partial<UserInfoVo>>({});
    const appStore = useAppStore();

    const getToken = computed(() => token.value);

    const {
      pause: stopGetUserInfoPoll,
      resume: startGetUserInfoPoll,
      isActive: isPollActive,
    } = useTimeoutPoll(
      async () => {
        const { data: res } = await api.profile.profileFindUserInfo();

        if (res.code === 0)
          each(get(res, 'data'), (value, key) => set(userInfo, key, value));
      },
      TimeEnum.LONG_POLLING_INTERVAL,
      { immediate: false },
    );

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

    async function logout(callApi: boolean = true) {
      if (callApi) await api.auth.authLogout();

      setToken(void 0);
      await router.replace(PageEnum.BASE_LOGIN);
      isPollActive.value && stopGetUserInfoPoll();
    }

    async function afterLoginAction(goHome?: boolean) {
      if (!getToken.value) return;

      await getUserInfoAction();
      const routes = await appStore.generateDynamicRoutes();
      router.addRoute(routes);

      goHome && (await router.replace(PageEnum.BASE_HOME));
    }

    function getUserInfoAction() {
      if (!getToken.value) return;

      // 轮询用户信息 检查token是否过期
      !isPollActive.value && startGetUserInfoPoll();

      return new Promise(resolve => {
        waittingFor(() => !isEmpty(userInfo), bind(resolve, void 0, userInfo));
      });
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
