<script setup lang="ts">
import { SkinOutlined } from '@ant-design/icons-vue';

defineOptions({ name: 'DarkModeSwitch' });

const colorMode = useColorMode();

const selectedKeys = ref([colorMode.value]);
function handleUpdate(value: 'light' | 'dark' | 'auto') {
  colorMode.value = value;
  selectedKeys.value = [value];
}
</script>

<template>
  <a-dropdown placement="bottom" trigger="click">
    <skin-outlined />
    <template #overlay>
      <a-menu
        v-model:selected-keys="selectedKeys"
        @click="handleUpdate($event.key)"
      >
        <a-menu-item key="light">
          {{ $t('app.setting.pageStyle.light-short') }}
        </a-menu-item>
        <a-menu-item key="dark">
          {{ $t('app.setting.pageStyle.dark-short') }}
        </a-menu-item>
        <a-menu-item key="auto">
          {{ $t('app.setting.pageStyle.auto-match') }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
