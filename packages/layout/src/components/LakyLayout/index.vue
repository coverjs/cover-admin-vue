<script setup lang="ts">
import type { ProlayoutEmits, ProLayoutProps } from './types';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { Layout as AntLayout, Space as AntSpace, Spin as AntSpin, theme } from 'ant-design-vue';
import { computed, type CSSProperties } from 'vue';
import PageTags from '../PageTags/index.vue';
import RouteListener from '../PageTags/RouteListener.vue';
import Breadcrumb from './Breadcrumb.vue';

defineOptions({ name: 'LakyLayout' });

withDefaults(defineProps<ProLayoutProps>(), {
  pure: false,
  showPageTags: true
});
const emits = defineEmits<ProlayoutEmits>();

const { Sider: AntLayoutSider, Header: AntLayoutHeader, Content: AntLayoutContent } = AntLayout;

const { token } = theme.useToken();

const headerStyle = computed(() => {
  const defaultStyle: CSSProperties = {
    height: '64px',
    lineHeight: '64px',
    paddingInline: 0,
    borderBottom: `1px solid ${token.value.colorBorder}}`,
  };
  return defaultStyle;
});

function updatedCollapsed(val: boolean) {
  emits('collapse', val);
  emits('update:collapsed', val);
}
</script>

<template>
  <ant-layout v-if="!pure" class="laky-layout-container">
    <ant-layout-sider
      :collapsed="collapsed"
      theme="light"
      :trigger="null"
      collapsible
      :style="{ backgroundColor: token.colorBgContainer, color: token.colorText }"
    >
      <div class="laky-layout-title">
        <span>
          <slot name="title" :collapsed="collapsed">
            <slot name="logo" />
            <span v-show="!collapsed" style="margin-left:10px">
              <slot name="titleText" />
            </span>
          </slot>
        </span>
      </div>
      <slot name="menu" />
    </ant-layout-sider>
    <ant-layout :style="{ borderLeft: `1px solid ${token?.colorBorder}` }">
      <ant-layout-header :style="headerStyle" class="laky-layout-header">
        <div class="laky-layout-header-container">
          <div class="flex-1 overflow-x-auto">
            <slot name="headerContent">
              <menu-unfold-outlined v-if="collapsed" class="trigger" @click="updatedCollapsed(false)" />
              <menu-fold-outlined v-else class="trigger" @click="updatedCollapsed(true)" />
              <slot name="breadcrumb">
                <breadcrumb />
              </slot>
            </slot>
          </div>
          <ant-space align="center" class="flex-shrink-0">
            <slot name="headerActions" />
          </ant-space>
        </div>
      </ant-layout-header>
      <ant-layout-content :style="{ backgroundColor: token.colorBgLayout }">
        <page-tags v-if="showPageTags" />
        <ant-spin :spinning="loading">
          <div class="page-container mx-[16px] my-[24px] overflow-auto p-[24px]">
            <slot :route-listener="RouteListener">
              <router-view v-slot="routeProps">
                <!-- routeListener 为 renderless 组件 -->
                <route-listener
                  v-slot="{ include, componentKey }"
                  :route-props="routeProps"
                >
                  <transition name="fade-transform" mode="out-in">
                    <keep-alive :include="include">
                      <component :is="routeProps.Component" :key="componentKey" />
                    </keep-alive>
                  </transition>
                </route-listener>
              </router-view>
            </slot>
          </div>
        </ant-spin>
      </ant-layout-content>
    </ant-layout>
  </ant-layout>
  <template v-else>
    <slot :route-listener="RouteListener" />
  </template>
</template>

<style lang="scss" scoped>
.laky-layout-container {
  position: relative;
  height: 100%;
  width: 100%;
  .laky-layout-title{

    border-inline-end: 1px solid rgba(5, 5, 5, 0.06);
    height: 65px;
    font-size: 20px;
    line-height: 24px;
    padding: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {

      text-wrap: nowrap;
    }
    > img {
      margin: 0 auto;
      width: 45px;
      height: 45px;
    }
  }
  .laky-layout-header {
    position: relative;
    padding-inline: 50px;
    color: var(--text-color);
    line-height: 64px;
    background: var(--bg-color);
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    &-container {
      display: flex;
      padding: 0 24px;
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
}
</style>
