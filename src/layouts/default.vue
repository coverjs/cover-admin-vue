<script lang="ts" setup>
import type { RouteMeta } from 'vue-router';
import { useAppStore } from '@/store';
import { loadEnv } from '@/utils';
import { useAntdToken } from '@/hooks';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';

import HeaderActions from '@/components/HeaderActions.vue';
import LayoutHeader from '@/components/LayoutHeader/index.vue';
import SettingDrawer from '@/components/SettingDrawer/index.vue';
import SubMenu from '@/components/SubMenu/index.vue';

import Logo from '@/assets/logo.png';

defineOptions({ name: 'DefaultLayout' });
const prefixCls = shallowRef('cover-layout-app');

const openKeys = ref<string[]>([]);
const collapsed = ref<boolean>(false);

const exception = ref(false);
const exceptionCode = ref(403);

const env = loadEnv();

const route = useRoute();

const { token } = useAntdToken();

function checkedException(meta: RouteMeta) {
  if (meta.exception) {
    exception.value = true;
    exceptionCode.value = meta.exceptionCode as number;
  } else {
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
  <a-layout :class="`${prefixCls}`">
    <a-layout-sider
      v-model:collapsed="collapsed"
      theme="light"
      :trigger="null"
      collapsible
    >
      <div :class="`${prefixCls}-title`">
        <span>
          <img class="title-logo" :src="Logo" alt="logo" />
          <template v-if="!collapsed">
            {{ env.VITE_APP_TITLE ?? 'Cover Admin' }}
          </template>
        </span>
      </div>
      <a-menu
        v-model:openKeys="openKeys"
        :selectedKeys="[$route.path]"
        mode="inline"
      >
        <template v-for="menu in appStore.menuData" :key="menu.path">
          <sub-menu :item="menu" />
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ borderLeft: `1px solid ${token.colorBorder}` }">
      <layout-header>
        <template #headerContent>
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <header-breadcrumb />
        </template>
        <template #headerActions>
          <header-actions />
        </template>
      </layout-header>
      <a-layout-content>
        <page-tags />
        <div class="my-[24px] mx-[16px] p-[24px] overflow-auto page-container">
          <fallback-page v-if="exception" :status="Number(exceptionCode)" />

          <router-view v-else v-slot="{ Component, route }">
            <transition name="fade-transform" mode="out-in">
              <keep-alive>
                <component :is="Component" :key="route.path" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
  <setting-drawer
    v-if="env.VITE_SHOW_SETTING === 'true'"
    :theme="layoutSetting.theme"
    :color-primary="layoutSetting.colorPrimary"
    :layout-setting="layoutSetting"
    @settingChange="appStore.changeSettingLayout"
  />
</template>

<style scoped lang="scss">
.cover-layout-app {
  position: relative;
  height: 100%;
  width: 100%;

  &-title {
    border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
    height: 65px;
    font-size: 20px;
    line-height: 24px;
    padding: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    .title-logo {
      display: inline-block;
      width: 45px;
      height: 45px;
    }
    > span {
      text-wrap: nowrap;
    }

    > img {
      margin: 0 auto;
      width: 45px;
      height: 45px;
    }
  }
  .page-container {
    overflow-x: hidden;
  }
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
