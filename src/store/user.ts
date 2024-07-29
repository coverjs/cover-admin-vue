import type { AccountLoginDto } from "@/services";
import type { RequestParams } from "@/types";

import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { createApi } from "@/utils";
import { each, get, set } from "lodash-es";

const api = createApi();

export const useUserStore = defineStore("app-user", () => {
  const token = ref<string>("");
  const userInfo = reactive({
    username: "",
    nickname: "",
    email: "",
    role: {},
  });

  const getToken = computed(() => token.value);

  function setToken(value: string) {
    token.value = value;
  }

  async function login(data: AccountLoginDto) {
    const { data: res } = await api.accountControllerLogin(data, {
      customOptions: {
        authInterceptorEnabled: false,
      },
    } as RequestParams);
    if (res.code === 0) {
      setToken(res.data!.token);

      const { data: _res } = await api.accountControllerGetCurrentUser();
      if (_res.code === 0) {
        each(get(_res, "data"), (value, key) => {
          set(userInfo, key, value);
        });
      }
    }
    return res;
  }

  return { token, userInfo, login, getToken, setToken };
});
