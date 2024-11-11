<script setup lang="ts">
import { useAppStore } from '@/store';
import { CSSProperties } from 'vue';

defineOptions({
  name: 'LayoutHeader',
});


const prefixCls = shallowRef('cover-layout-header');
const cls = computed(() => ({
  [prefixCls.value]: true,
}));


const appStore = useAppStore();
const { layoutSetting } = storeToRefs(appStore);

const headerStyle = computed(() => {
  const defaultStyle: CSSProperties = {
    height: `${layoutSetting.value.headerHeight}px`,
    lineHeight: `${layoutSetting.value.headerHeight}px`,
    paddingInline: 0,
  };

  return defaultStyle;
});


</script>


<template>
  <a-layout-header :style="headerStyle" :class="cls">
    <div :class="`${prefixCls}-container`">
      <div class=" flex-1 overflow-x-auto">
        <slot name="headerContent" />
      </div>
      <a-space align="center" class="flex-shrink-0">
        <slot name="headerActions" />
      </a-space>
    </div>

  </a-layout-header>
</template>

<style lang="scss" src="./index.scss" scoped></style>
