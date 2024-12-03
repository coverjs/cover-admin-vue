<script lang="ts" setup>
import type { RouteMeta } from 'vue-router';

import Logo from '@/assets/logo.png';
import PageRouteListener from '@/components/PageTags/PageRouteListener.vue';

import { useAppStore } from '@/store';
import { loadEnv } from '@/utils';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';

import { ProLayout as LakyLayout } from '@lakyjs/components-vue-layout';

defineOptions({ name: 'DefaultLayout' });

const openKeys = ref<string[]>([]);
const collapsed = ref<boolean>(false);

const exception = ref(false);
const exceptionCode = ref(403);

const env = loadEnv();

const route = useRoute();

function checkedException(meta: RouteMeta) {
  if (meta.exception) {
    exception.value = true;
    exceptionCode.value = meta.exceptionCode as number;
  }
  else {
    exception.value = false;
  }
}

watch(
  () => route.meta,
  val => {
    checkedException(val);
  },
  { immediate: true },
);
const appStore = useAppStore();
const { layoutSetting } = storeToRefs(appStore);

onMounted(() => {
  const originPath = route.meta?.originPath;
  openKeys.value = originPath ? [originPath] : [];
});
</script>

<template>
  <laky-layout :collapsed="collapsed">
    <!-- 系统Logo -->
    <template #logo>
      <img class="title-logo" :src="Logo" alt="logo">
    </template>

    <!-- 系统标题 -->
    <template #titleText>
      {{ env.VITE_APP_TITLE ?? 'Cover Admin' }}
    </template>

    <!-- 系统菜单 -->
    <template #menu>
      <a-menu v-model:open-keys="openKeys" :selected-keys="[$route.path]" mode="inline">
        <template v-for="menu in appStore.menuData" :key="menu.path">
          <sub-menu :item="menu" />
        </template>
      </a-menu>
    </template>

    <!-- 头部 -->
    <template #headerContent>
      <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
      <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      <header-breadcrumb />
    </template>

    <!-- 头部操作栏 -->
    <template #headerActions>
      <header-actions />
    </template>

    <page-tags v-show="appStore.tags.length > 0" />
    <div class="page-container mx-[16px] my-[24px] overflow-auto p-[24px]">
      <fallback-page v-if="exception" :status="Number(exceptionCode)" />
      <router-view v-else v-slot="{ Component, route: _route }">
        <!-- page-route-listener 为 renderless 组件 -->
        <page-route-listener v-slot="{ include, componentKey }" :component="Component" :route="_route">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="include">
              <component :is="Component" :key="componentKey" />
            </keep-alive>
          </transition>
        </page-route-listener>
      </router-view>
    </div>
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

.page-container {
  overflow-x: hidden;
}

.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>
