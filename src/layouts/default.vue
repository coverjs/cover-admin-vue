<script lang="ts" setup>
import type { RouteMeta } from 'vue-router';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons-vue';
import { useAppStore } from '@/store';
import { loadEnv } from '@/utils';

import SettingDrawer from '@/components/SettingDrawer/index.vue';

defineOptions({ name: 'DefaultLayout' });

const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);

const exception = ref(false);
const exceptionCode = ref(403);

const env = loadEnv();

const route = useRoute();

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
</script>

<template>
  <a-layout class="app-wrapper">
    <a-layout-sider
      v-model:collapsed="collapsed"
      theme="light"
      :trigger="null"
      collapsible
    >
      <div class="title">
        <span v-if="!collapsed">
          {{ env.VITE_APP_TITLE ?? 'Cover Admin' }}
        </span>
      </div>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <layout-header>
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
        </layout-header>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
        }"
      >
        <fallback-page v-if="exception" :status="Number(exceptionCode)" />
        <router-view v-else />
      </a-layout-content>
    </a-layout>
  </a-layout>
  <setting-drawer
    v-if="env.VITE_SHOW_SETTING === true"
    :theme="layoutSetting.theme"
    :color-primary="layoutSetting.colorPrimary"
    :layout-setting="layoutSetting"
    @settingChange="appStore.changeSettingLayout"
  />
</template>

<style scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  .title {
    border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
    height: 65px;
    font-size: 20px;
    line-height: 24px;
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }
}
</style>
