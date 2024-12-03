<script setup lang="ts">
import type { ProlayoutEmits, ProLayoutProps } from './types';
import { useAntdToken } from '@lakyjs/components-vue-hooks';
import { Layout as AntLayout, Space as AntSpace } from 'ant-design-vue';
import { computed, type CSSProperties } from 'vue';

defineOptions({ name: 'LakyLayout' });

withDefaults(defineProps<ProLayoutProps>(), {
  pure: false,
});
defineEmits<ProlayoutEmits>();

const { Sider: AntLayoutSider, Header: AntLayoutHeader, Content: AntLayoutContent } = AntLayout;

const { token } = useAntdToken();

const headerStyle = computed(() => {
  const defaultStyle: CSSProperties = {
    height: '64px',
    lineHeight: '64px',
    paddingInline: 0,
  };
  return defaultStyle;
});
</script>

<template>
  <ant-layout class="laky-layout-container">
    <ant-layout-sider
      :collapsed="collapsed"
      theme="light"
      :trigger="null"
      collapsible
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
    <ant-layout :style="{ borderLeft: `1px solid ${token.colorBorder}` }">
      <ant-layout-header :style="headerStyle" class="laky-layout-header">
        <div class="laky-layout-header-container">
          <div class="flex-1 overflow-x-auto">
            <slot name="headerContent" />
          </div>
          <ant-space align="center" class="flex-shrink-0">
            <slot name="headerActions" />
          </ant-space>
        </div>
      </ant-layout-header>
      <ant-layout-content>
        <!-- page-tags -->
        <suspense>
          <!-- <div class="page-container mx-[16px] my-[24px] overflow-auto p-[24px]"> -->
          <slot />
          <!-- </div> -->
        </suspense>
      </ant-layout-content>
    </ant-layout>
  </ant-layout>
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
}
</style>
