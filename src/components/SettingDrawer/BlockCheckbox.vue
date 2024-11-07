<script setup lang="ts">
import { CheckOutlined } from '@ant-design/icons-vue';
import { useAntdToken } from '@/composables/antd-token.ts';
import { ThemeType } from '@/store/app.ts';

const prefixCls = 'cover-setting-drawer-block-checkbox';
const props = defineProps<{
  theme?: ThemeType
  isDark?: boolean
  checked?: boolean
  t?: (key: string, ...args: any[]) => string
}>();

const { token } = useAntdToken();
const cls = computed(() => {
  return {
    [`${prefixCls}-item`]: true,
    [`${prefixCls}-theme-item`]: props.isDark,
    [`${prefixCls}-item-${props.theme}`]: !!props.theme,
    [`${prefixCls}-theme-item-${props.theme}`]: props.isDark,
  };
});

</script>

<template>
  <a-tooltip>
    <template #title>
      {{ theme === 'light' ? `${t && t('app.setting.pageStyle.light')}` : `${t && t('app.setting.pageStyle.dark')}` }}
    </template>
    <div :class="cls">
      <CheckOutlined v-show="checked" :style="{ color: token?.colorPrimary }" :class="`${prefixCls}-selectIcon`" />
    </div>
  </a-tooltip>
</template>

<style scoped lang="scss">

</style>
