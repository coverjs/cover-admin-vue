<script setup lang="ts">
import { CheckOutlined } from '@ant-design/icons-vue';

defineOptions({ name: 'BlockThemeColor' });

defineProps<{
  colorList: { key: string, color: string }[]
  color?: string
  onChange?: (color: string) => void
  t?: (key: string, ...args: any[]) => string
}>();

const prefixCls = shallowRef('cover-setting-drawer-block-theme-color');
</script>

<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}-content`">
      <a-tooltip v-for="item in colorList" :key="item.color">
        <template #title>
          {{ t?.(`app.setting.themeColor.${item.key}`) }}
        </template>
        <div
          :class="`${prefixCls}-item`"
          :style="{ backgroundColor: item.color }"
          @click="onChange?.(item.color)"
        >
          <CheckOutlined v-show="color === item.color" />
        </div>
      </a-tooltip>
    </div>
  </div>
</template>
