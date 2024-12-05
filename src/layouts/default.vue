<script lang="ts" setup>
import type { RouteMeta } from 'vue-router';

import Logo from '@/assets/logo.png';

import { useAppStore } from '@/store';
import { loadEnv } from '@/utils';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { LakyLayout, REDIRECT_NAME } from '@lakyjs/components-vue-layout';

defineOptions({ name: 'DefaultLayout' });

const openKeys = ref<string[]>([]);
const collapsed = ref<boolean>(false);

const exception = ref(false);
const exceptionCode = ref(403);

const env = loadEnv();

const route = useRoute();

const showBreadcrumb = computed(() => route.name !== REDIRECT_NAME as unknown);

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
      <header-breadcrumb v-show="showBreadcrumb" />
    </template>

    <!-- 头部操作栏 -->
    <template #headerActions>
      <header-actions />
    </template>

    <!-- 内容 -->
    <template #default="{ routeListener }">
      <fallback-page v-if="exception" :status="Number(exceptionCode)" />
      <router-view v-else v-slot="routeProps">
        <!-- routeListener 为 renderless 组件 -->
        <component
          :is="routeListener"
          v-slot="{ include, componentKey }"
          :route-props="routeProps"
        >
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="include">
              <component :is="routeProps.Component" :key="componentKey" />
            </keep-alive>
          </transition>
        </component>
      </router-view>
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
