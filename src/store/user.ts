import type { AccountLoginDto } from "@/services";
import type { RequestParams } from "@/types";

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { createApi } from "@/utils";

export const useUserStore = defineStore("app-user", () => {
  const token = ref<string>("");
  const api = createApi();

  const getToken = computed(() => token.value);

  function setToken(value: string) {
    token.value = value;
  }

  async function login(data: AccountLoginDto) {
    const res = await api.accountControllerLogin(data, {
      customOptions: {
        authInterceptorEnabled: false,
      },
    } as RequestParams);
    if (res.data.code === 0) {
      setToken(res.data?.data?.token!);
    }
    return res.data;
  }

  return { login, getToken };
});
