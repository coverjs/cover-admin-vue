<script setup lang="ts">
import { CloseOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { ThemeType, useAppStore } from '@/store/app.ts';
import BlockCheckbox from '@/components/SettingDrawer/BlockCheckbox.vue';
import Block from '@/components/SettingDrawer/Block.vue';
import BlockThemeColor from '@/components/SettingDrawer/BlockThemeColor.vue';
import { useAntdToken } from '@/composables/antd-token.ts';

defineOptions({
  name: 'SettingDrawer',
});
const appStore = useAppStore();
const { layoutSetting } = storeToRefs(appStore);
const open = ref(false);

withDefaults(defineProps<{
  theme?: ThemeType
  colorPrimary?: string
  layoutSetting?: Record<string, any>
  colorList?: { key: string, color: string }[]
}>(), {
  theme: 'light',
  colorList: () => [
    { key: 'techBlue', color: '#1677FF' },
    { key: 'daybreak', color: '#1890ff' },
    { key: 'dust', color: '#F5222D' },
    { key: 'volcano', color: '#FA541C' },
    { key: 'sunset', color: '#FAAD14' },
    { key: 'cyan', color: '#13C2C2' },
    { key: 'green', color: '#52C41A' },
    { key: 'geekBlue', color: '#2F54EB' },
    { key: 'purple', color: '#722ED1' },
  ],
});

const emit = defineEmits(['settingChange']);

const prefixCls = 'cover-setting-drawer';


function handleVisible(status: boolean) {
  open.value = status;
}

const handleThemeColorChange = (color: string) => {
  emit('settingChange', 'colorPrimary', color);

};

function changeTheme(theme: string) {
  emit('settingChange', 'theme', theme);
}


const { token } = useAntdToken();

const { t } = useI18n();


</script>

<template>
  <div :class="`${prefixCls}-handle`"
       :style="{
      backgroundColor: token?.colorPrimary,
      borderEndStartRadius: `${token?.borderRadius}px`,
      borderStartStartRadius: `${token?.borderRadius}px`,
    }"
       @click="handleVisible(!open)"
  >
    <CloseOutlined
      v-if="open"
      :class="`${prefixCls}-handle-icon${layoutSetting.theme === 'light' ? '' : '-dark'}`"
      style="font-size: 20px"
    />
    <SettingOutlined
      v-else
      :class="`${prefixCls}-handle-icon${layoutSetting.theme === 'light' ? '' : '-dark'}`"
      style="font-size: 20px"
    />
  </div>
  <a-drawer :open="open" :width="300" placement="right" :closable="false">
    <template #handle>
      <div :class="`${prefixCls}-handle`"
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
        <CloseOutlined
          v-if="open"
          :class="`${prefixCls}-handle-icon${layoutSetting.theme === 'light' ? '' : '-dark'}`"
          style="font-size: 20px"
        />
        <SettingOutlined
          v-else
          :class="`${prefixCls}-handle-icon${layoutSetting.theme === 'light' ? '' : '-dark'}`"
          style="font-size: 20px"
        />
      </div>
    </template>
    <div :class="`${prefixCls}-content`">
      <Block :title="t('app.setting.pageStyle.pageStyle')">
        <div :class="`${prefixCls}-block-checkbox`">
          <BlockCheckbox :t="t" theme="light" :is-dark="false" :checked="theme === 'light'"
                         @click="changeTheme('light')" />
          <BlockCheckbox :t="t" theme="dark" :is-dark="true" :checked="theme==='dark'"
                         @click="changeTheme('dark')" />
        </div>
      </Block>
      <Block :title="t('app.setting.themeColor.themeColor')">
        <BlockThemeColor :t="t" :color-list="colorList" :color="colorPrimary" :on-change="handleThemeColorChange" />
      </Block>
    </div>
  </a-drawer>

</template>

<style lang="scss">
@import './index.scss';
</style>
