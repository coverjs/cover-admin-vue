<script lang="ts" setup>
import Logo from '@/assets/logo.png';
import { PageEnum } from '@/enums';

import { useAppStore } from '@/store';
import { loadEnv } from '@/utils';
import { LakyLayout } from '@lakyjs/components-vue-layout';

defineOptions({ name: 'DefaultLayout' });

const openKeys = ref<string[]>([]);
const collapsed = ref<boolean>(false);

const env = loadEnv();

const route = useRoute();

const appStore = useAppStore();
const { layoutSetting } = storeToRefs(appStore);

onMounted(() => {
  const originPath = route.meta?.originPath;
  openKeys.value = originPath ? [originPath] : [];
});
</script>

<template>
  <laky-layout
    v-model:collapsed="collapsed"
    :home-path="PageEnum.BASE_HOME"
    :menu-data="appStore.menuData"
    :open-keys="openKeys"
  >
    <!-- 系统Logo -->
    <template #logo>
      <img class="title-logo" :src="Logo" alt="logo">
    </template>

    <!-- 系统标题 -->
    <template #titleText>
      {{ env.VITE_APP_TITLE ?? 'Cover Admin' }}
    </template>

    <!-- 头部操作栏 -->
    <template #headerActions>
      <header-actions />
    </template>
  </laky-layout>

  <setting-drawer
    v-if="env.VITE_SHOW_SETTING === 'true'"
    :theme="layoutSetting.theme"
    :color-primary="layoutSetting.colorPrimary"
    :layout-setting="layoutSetting"
    @setting-change="appStore.changeSettingLayout"
  />
</template>

<style scoped lang="scss">
.laky-layout-title {

  .title-logo {
    display: inline-block;
    width: 35px;
    height: 35px;
  }

  >span {
    text-wrap: nowrap;
  }

  >img {
    margin: 0 auto;
  }
}
</style>
