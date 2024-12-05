import type { AccountLoginDto, UserInfoVo } from '@/services';
import type { ArrayResponse } from '@/types';
import { PageEnum, TimeEnum } from '@/enums';
import { router } from '@/router';
import { api } from '@/services';
import { delay, each, get, set } from 'lodash-es';
import { store, useAppStore } from '.';

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
        const [err, res] = await api.profile.profileFindUserInfo({ customOptions: { responseMode: 'array' } }) as unknown as ArrayResponse<UserInfoVo>;
        if (err)
          return;

        each(get(res, 'data'), (value, key) => set(userInfo, key, value));
      },
      TimeEnum.LONG_POLLING_INTERVAL,
      { immediate: false },
    );

    function setToken(value: string | void) {
      token.value = value;
    }

    async function login(data: AccountLoginDto, goHome: boolean = true) {
      const [err, res] = await api.auth.authLogin(data, {
        customOptions: {
          withToken: false,
          responseMode: 'array'
        },
      }) as unknown as ArrayResponse;
      if (err)
        throw err;

      setToken(res!.data!.token);
      await afterLoginAction(goHome);
      return userInfo;
    }

    async function logout(callApi: boolean = true) {
      if (callApi)
        await api.auth.authLogout();

      setToken(void 0);
      await router.replace(PageEnum.BASE_LOGIN);
      isPollActive.value && stopGetUserInfoPoll();
    }

    async function afterLoginAction(goHome?: boolean) {
      if (!getToken.value)
        return;

      await getUserInfoAction();
      const routes = await appStore.generateDynamicRoutes();
      router.addRoute(routes);

      goHome && (await router.replace(PageEnum.BASE_HOME));
    }

    async function getUserInfoAction() {
      if (!getToken.value)
        return;

      delay(() => {
        // 轮询用户信息 检查token是否过期
        !isPollActive.value && startGetUserInfoPoll();
      }, TimeEnum.LONG_POLLING_INTERVAL);

      const [err, res] = await api.profile.profileFindUserInfo({ customOptions: { responseMode: 'array' } }) as unknown as ArrayResponse;

      if (err)
        throw err;

      each(get(res, 'data'), (value, key) => set(userInfo, key, value));

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
