<script setup lang="ts">
import type { LanguagesType } from '@/locales/types';

import { CacheEnum } from '@/enums';
import { loadMessages } from '@/locales';
import { i18n } from '@/locales/i18n';
import { genStorageKey } from '@/utils';
import { TranslationOutlined } from '@ant-design/icons-vue';

defineOptions({ name: 'LanguageToggle' });

const selectedKeys = ref([i18n.global.locale.value]);

const localeStorage = useLocalStorage(
  genStorageKey(CacheEnum.LOCALE_KEY),
  i18n.global.locale.value,
);

async function handleUpdate(value: LanguagesType) {
  await loadMessages(value);
  selectedKeys.value = [value];
  localeStorage.value = value;
}
</script>

<template>
  <a-dropdown placement="bottom" trigger="click">
    <TranslationOutlined />
    <template #overlay>
      <a-menu
        v-model:selected-keys="selectedKeys"
        @click="handleUpdate($event.key)"
      >
        <a-menu-item key="zh-CN">
          简体中文
        </a-menu-item>
        <a-menu-item key="en-US">
          English
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style lang="scss" scoped>
.ant-dropdown-trigger {
  height: 24px;
}
</style>
