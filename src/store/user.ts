import { each, get, set } from 'lodash-es';
import { router } from '@/router';
import { store } from '.';
import { api, type AccountLoginDto } from '@/services';
import { PageEnum } from '@/enums';

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string | void>('');
    const userInfo = reactive({
      username: '',
      nickname: '',
      email: '',
      role: {},
    });

    const getToken = computed(() => token.value);

    function setToken(value: string | void) {
      token.value = value;
    }

    async function login(data: AccountLoginDto, goHome: boolean = true) {
      const { data: res } = await api.auth.authControllerLogin(data, {
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

      goHome && (await router.replace(PageEnum.BASE_HOME));
    }

    async function getUserInfoAction() {
      if (!getToken.value) return;

      const { data: res } = await api.profile.profileControllerFindUserInfo();
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
