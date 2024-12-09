import type { AccountLoginDto, UserInfoVo } from '@/services';
import type { ArrayResponse } from '@/types';
import { PageEnum, TimeEnum } from '@/enums';
import { router } from '@/router';
import { api } from '@/services';
import { genLoginRoteLocation } from '@/utils';
import { useRedirectPage } from '@lakyjs/components-vue-layout';
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
        const [err, res] = await api.profile.profileGetInfo({ customOptions: { responseMode: 'array' } }) as unknown as ArrayResponse<UserInfoVo>;
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
      const { currentRoute, replace } = router;

      // callapi 说明是自动登出 则不需要保留 redirect 信息
      const location = callApi ? PageEnum.BASE_LOGIN : genLoginRoteLocation(unref(currentRoute));
      setToken(void 0);

      await replace(location);
      isPollActive.value && stopGetUserInfoPoll();
    }

    async function afterLoginAction(goHome?: boolean) {
      if (!getToken.value)
        return;

      await getUserInfoAction();
      const routes = await appStore.generateDynamicRoutes();
      router.addRoute(routes);

      const { currentRoute } = router;

      if (goHome) {
        await router.replace(PageEnum.BASE_HOME);
        return;
      }

      const currentQuery = currentRoute.value.query;
      const redirect = useRedirectPage({
        router,
        fullPath: currentQuery.redirect as string || '/',
        query: JSON.parse(currentQuery.redirectQuery as string || '{}'),
      });
      redirect();
    }

    async function getUserInfoAction() {
      if (!getToken.value)
        return;

      delay(() => {
        // 轮询用户信息 检查token是否过期
        !isPollActive.value && startGetUserInfoPoll();
      }, TimeEnum.LONG_POLLING_INTERVAL);

      const [err, res] = await api.profile.profileGetInfo({ customOptions: { responseMode: 'array' } }) as unknown as ArrayResponse;

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
