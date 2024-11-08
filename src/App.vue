<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { useRefreshPrompt, useAntdToken } from '@/hooks';
import { antdLocale } from '@/locales';
import { useAppStore } from '@/store/app.ts';
import { theme } from 'ant-design-vue';

defineOptions({
  name: 'App',
});

useRefreshPrompt();

const userStore = useUserStore();

onMounted(() => {
  userStore.getUserInfoAction();
});

const appStore = useAppStore();
const { theme: antdTheme } = storeToRefs(appStore);

// 重新设置 全局的token
const { token } = theme.useToken();
const { setToken } = useAntdToken();
watchEffect(() => {
  setToken(token.value);
});
</script>

<template>
  <a-config-provider :theme="antdTheme" :locale="antdLocale">
    <router-view />
  </a-config-provider>
</template>
