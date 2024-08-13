<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { useRefreshPrompt } from '@/hooks';
import { antdLocale } from '@/locales';

defineOptions({
  name: 'App',
});

useRefreshPrompt();

const userStore = useUserStore();

onMounted(() => {
  userStore.getUserInfoAction();
});
</script>

<template>
  <a-config-provider :locale="antdLocale">
    <router-view />
  </a-config-provider>
</template>
