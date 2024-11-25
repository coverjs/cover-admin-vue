<script setup lang="ts">
import type { LayoutSetting, ThemeType } from '@/types';
import { useAntdToken } from '@/hooks';
import { useAppStore } from '@/store';
import {
  CheckOutlined,
  CloseOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';

import BlockCheckbox from './BlockCheckbox.vue';
import BlockThemeColor from './BlockThemeColor.vue';
import SettingBlock from './SettingBlock.vue';

defineOptions({ name: 'SettingDrawer' });

withDefaults(
  defineProps<{
    theme?: ThemeType
    colorPrimary?: string
    layoutSetting?: Record<string, any>
    colorList?: { key: string, color: string }[]
  }>(),
  {
    theme: 'light',
    colorList: () => [
      { key: 'purple', color: '#722ED1' },
      { key: 'techBlue', color: '#1677FF' },
      { key: 'daybreak', color: '#1890ff' },
      { key: 'dust', color: '#F5222D' },
      { key: 'volcano', color: '#FA541C' },
      { key: 'sunset', color: '#FAAD14' },
      { key: 'cyan', color: '#13C2C2' },
      { key: 'green', color: '#52C41A' },
      { key: 'geekBlue', color: '#2F54EB' },
    ],
  },
);

const emit = defineEmits<{
  (e: 'settingChange', key: keyof LayoutSetting, value: string): void
}>();

const appStore = useAppStore();
const { layoutSetting: appLayoutSetting } = storeToRefs(appStore);
const open = ref(false);

const prefixCls = 'cover-setting-drawer';

function handleVisible(status: boolean) {
  open.value = status;
}

function handleThemeColorChange(color: string) {
  emit('settingChange', 'colorPrimary', color);
}

function changeTheme(theme: string) {
  emit('settingChange', 'theme', theme);
}

const { token } = useAntdToken();
</script>

<template>
  <div
    :class="`${prefixCls}-handle`"
    :style="{
      backgroundColor: token?.colorPrimary,
      borderEndStartRadius: `${token?.borderRadius}px`,
      borderStartStartRadius: `${token?.borderRadius}px`,
    }"
    @click="handleVisible(!open)"
  >
    <check-outlined
      v-if="open"
      :class="`${prefixCls}-handle-icon${appLayoutSetting.theme === 'light' ? '' : '-dark'}`"
      style="font-size: 20px"
    />
    <setting-outlined
      v-else
      :class="`${prefixCls}-handle-icon${appLayoutSetting.theme === 'light' ? '' : '-dark'}`"
      style="font-size: 20px"
    />
  </div>
  <a-drawer
    :open="open"
    :width="300"
    placement="right"
    :closable="false"
  >
    <template #handle>
      <div
        :class="`${prefixCls}-handle`"
        :style="{
          position: 'absolute',
          top: '240px',
          right: '300px',
          backgroundColor: token?.colorPrimary,
          borderEndStartRadius: `${token?.borderRadius}px`,
          borderStartStartRadius: `${token?.borderRadius}px`,
        }"
        @click="handleVisible(!open)"
      >
        <close-outlined
          v-if="open"
          :class="`${prefixCls}-handle-icon${appLayoutSetting.theme === 'light' ? '' : '-dark'}`"
          style="font-size: 20px"
        />
        <setting-outlined
          v-else
          :class="`${prefixCls}-handle-icon${appLayoutSetting.theme === 'light' ? '' : '-dark'}`"
          style="font-size: 20px"
        />
      </div>
    </template>
    <div :class="`${prefixCls}-content`">
      <setting-block :title="$t('app.setting.pageStyle.pageStyle')">
        <div :class="`${prefixCls}-block-checkbox`">
          <block-checkbox
            theme="light"
            :is-dark="false"
            :checked="theme === 'light'"
            @click="changeTheme('light')"
          />
          <block-checkbox
            theme="dark"
            :is-dark="true"
            :checked="theme === 'dark'"
            @click="changeTheme('dark')"
          />
        </div>
      </setting-block>
      <setting-block :title="$t('app.setting.themeColor.themeColor')">
        <block-theme-color
          :color="colorPrimary"
          :color-list="colorList"
          :on-change="handleThemeColorChange"
        />
      </setting-block>
    </div>
  </a-drawer>
</template>

<style lang="scss" src="./index.scss" scoped></style>
