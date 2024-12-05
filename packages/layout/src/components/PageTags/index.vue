<script setup lang="ts">
import type { PageTagItem } from './types';
import { theme } from 'ant-design-vue';
import { isEmpty, last, size, split } from 'lodash-es';
import { useRoute, useRouter } from 'vue-router';
import { useConfig } from '../ConfigProvider';
import { useStore } from './useStore';

defineOptions({ name: 'PageTags' });

const { token } = theme.useToken();
const store = useStore();
const route = useRoute();
const router = useRouter();
const config = useConfig();

function handleItemClose(tag: PageTagItem) {
  store.removeTag(tag);
}

const menuHandlers = new Map<string, (tag: PageTagItem) => void>();
menuHandlers.set('refresh', () => {
  store.refreshTag(router);
});

menuHandlers.set('close-right', (tag: PageTagItem) => {
  const index = store.tags.value.indexOf(tag);
  const target = store.tags.value.filter((_, idx) => idx > index);

  store.removeTags(target);
});

menuHandlers.set('close-left', (tag: PageTagItem) => {
  const index = store.tags.value.indexOf(tag);
  const target = store.tags.value.filter((_, idx) => idx < index);
  store.removeTags(target);
});

menuHandlers.set('close-other', (tag: PageTagItem) => {
  const target = store.tags.value.filter(item => item.fullPath !== tag.fullPath);
  store.removeTags(target);
});

function handleMenuClick(key: string, tag: PageTagItem) {
  menuHandlers.has(key) && menuHandlers.get(key)?.(tag);
}

function genTagTitle(tag: PageTagItem) {
  if (tag.meta?.locale && !isEmpty(tag.meta?.locale) && config?.t) {
    return config?.t(tag.meta.locale as string);
  }
  if (tag.meta?.title && !isEmpty(tag.meta.title)) {
    return tag.meta.title;
  }
  return last(split(tag.path, '/'));
}
</script>

<template>
  <div
    v-show="store.tags.value.length"
    class="page-tags-container"
    :style="{
      background: token?.colorBgContainer,
      borderTop: `1px solid ${token?.colorBorder}`,
    }"
  >
    <a-dropdown
      v-for="tag in store.tags.value"
      :key="tag.fullPath"
      :trigger="['contextmenu']"
    >
      <a-tag
        :key="tag.fullPath"
        :checked="route.fullPath === tag.fullPath"
        :closable="size(store.tags.value) > 1 && tag.fullPath !== route.fullPath"
        :color="route.path === tag.path ? token?.colorPrimaryActive : ''"
        @close="handleItemClose(tag)"
      >
        <router-link :to="tag.fullPath">
          {{ genTagTitle(tag) }}
        </router-link>
      </a-tag>
      <template #overlay>
        <a-menu @click="handleMenuClick($event.key, tag)">
          <a-menu-item key="refresh" :disabled="route.fullPath !== tag.fullPath">
            刷新
          </a-menu-item>
          <a-menu-item key="close-right">
            关闭右侧
          </a-menu-item>
          <a-menu-item key="close-left">
            关闭左侧
          </a-menu-item>
          <a-menu-item key="close-other">
            关闭其他
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.page-tags-container {
  display: inline-block;
  padding: 10px;
  width: 100%;
  span.ant-tag {
    cursor: pointer;
  }
}
</style>
