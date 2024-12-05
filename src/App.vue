<script setup lang="ts">
import { useAntdToken, useLogoToFavicon, useRefreshPrompt } from '@/hooks';
import { antdLocale } from '@/locales';
import { useAppStore } from '@/store';
import { registerTokenToCSSVar } from '@/utils';
import { LakyConfigProvider } from '@lakyjs/components-vue-layout';
import { theme } from 'ant-design-vue';

defineOptions({
  name: 'App',
});

useRefreshPrompt();
useLogoToFavicon();

const appStore = useAppStore();
const { theme: antdTheme } = storeToRefs(appStore);
const { t } = useI18n();

// 重新设置 全局的token
const { token } = theme.useToken();
const { setToken } = useAntdToken();

watchEffect(() => {
  setToken(token.value);
  registerTokenToCSSVar(token.value);
});
</script>

<template>
  <laky-config-provider :theme="antdTheme" :locale="antdLocale" :t="t">
    <router-view />
  </laky-config-provider>
</template>
