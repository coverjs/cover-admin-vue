<script setup lang="ts">
import type { PageContainerProps } from './types';
import { VnodeRender } from '@lakyjs/components-vue-utils';

import { TabPane, Tabs } from 'ant-design-vue';
import useConfigInject from 'ant-design-vue/es/config-provider/hooks/useConfigInject';

defineOptions({ name: 'HeaderTabList' });

const props = defineProps<PageContainerProps>();
defineEmits<{
  (e: 'tChange', tab: number | string): void
}>();
const { prefixCls } = useConfigInject('page', props);
</script>

<template>
  <tabs
    v-bind="props.tabProps"
    class="cover-page-header-tabs"
    :class="`${prefixCls}-tabs`"
    :active-key="props.tabActiveKey"
    @change="(k) => $emit('tChange', k)"
  >
    <tab-pane
      v-for="item in props.tablist"
      :key="item.key"
      :tab="item.tab"
      :disabled="item.disabled"
      :closable="item.closable"
    />
    <template #rightExtra>
      <slot name="extra">
        <vnode-render v-if="props.tabBarExtra" :virtual-node="props.tabBarExtra" />
      </slot>
    </template>
  </tabs>
</template>

<style lang="scss" scoped>
.cover-page-header-tabs {
  :first-child {
    margin-bottom: 0;
  }
}
</style>
