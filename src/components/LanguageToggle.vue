<script setup lang="ts">
import type { LanguagesType } from '@/locales/types';

import { TranslationOutlined } from '@ant-design/icons-vue';
import { loadMessages } from '@/locales';
import { CacheEnum } from '@/enums';
import { genStorageKey } from '@/utils';
import { i18n } from '@/locales/i18n';

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
		<translation-outlined />
		<template #overlay>
			<a-menu
				v-model:selectedKeys="selectedKeys"
				@click="handleUpdate($event.key)"
			>
				<a-menu-item key="zh-CN"> 简体中文 </a-menu-item>
				<a-menu-item key="en-US"> English </a-menu-item>
			</a-menu>
		</template>
	</a-dropdown>
</template>

<style lang="scss" scoped>
.ant-dropdown-trigger {
	height: 24px;
}
</style>
