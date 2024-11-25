<script setup lang="ts">
import type { ThemeType } from '@/types';

import { useAntdToken } from '@/hooks';
import { CheckOutlined } from '@ant-design/icons-vue';

defineOptions({ name: 'BlockCheckbox' });

const props = defineProps<{
  theme?: ThemeType
  isDark?: boolean
  checked?: boolean
}>();

const prefixCls = 'cover-setting-drawer-block-checkbox';

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
      {{
        theme === 'light'
          ? $t('app.setting.pageStyle.light')
          : $t('app.setting.pageStyle.dark')
      }}
    </template>
    <div :class="cls">
      <check-outlined
        v-show="checked"
        :style="{ color: token?.colorPrimary }"
        :class="`${prefixCls}-selectIcon`"
      />
    </div>
  </a-tooltip>
</template>
