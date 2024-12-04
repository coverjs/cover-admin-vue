<script setup lang="ts">
import type {
  PageContainerEmits,
  PageContainerProps,
  PageContainerSlots,
} from './types';
import { useAntdToken } from '@lakyjs/components-vue-hooks';
import { VnodeRender } from '@lakyjs/components-vue-utils';
import useConfigInject from 'ant-design-vue/es/config-provider/hooks/useConfigInject';
import PageHeader from './PageHeader.vue';
import { getStyle } from './style';
import TabList from './TabList.vue';

defineOptions({ name: 'PageContainer' });

const props = defineProps<PageContainerProps>();
defineEmits<PageContainerEmits>();
defineSlots<PageContainerSlots>();

const { prefixCls } = useConfigInject('page', props);
const { token } = useAntdToken();
</script>

<template>
  <div :class="prefixCls" class="page-container">
    <div
      :class="`${prefixCls}-container-header`"
      :style="getStyle(token, 'container-header')"
    >
      <page-header v-if="header" v-bind="header">
        <slot v-if="$slots?.header" name="header" />
        <template #extra>
          <slot v-if="$slots?.headerExtra" name="headerExtra" />
        </template>
      </page-header>
      <tab-list
        v-if="tablist?.length"
        v-bind="$props"
        @t-change="(k) => $emit('tabChange', k)"
      >
        <template #extra>
          <slot v-if="$slots?.tabBarExtra" name="tabBarExtra" />
        </template>
      </tab-list>
    </div>
    <div
      :class="`${prefixCls}-content`"
      :style="getStyle(token, 'container-content')"
    >
      <vnode-render v-if="content" :virtual-node="content" />
      <slot v-else />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  .cover-tabs-nav {
    margin-bottom: 0;
  }
}
</style>
