<script setup lang="ts">
import type { PageTagItem } from './types';
import { CloseOutlined, MenuOutlined, SyncOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons-vue';
import { Dropdown as AntDropdown, Menu as AntMenu, MenuDivider as AntMenuDivider, MenuItem as AntMenuItem, Space as AntSpace, Tag as AntTag, theme } from 'ant-design-vue';
import { isEmpty, last, size, split } from 'lodash-es';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useConfig } from '../ConfigProvider';
import { useStore } from './useStore';

defineOptions({ name: 'PageTags' });

const { token } = theme.useToken();
const store = useStore();
const route = useRoute();
const router = useRouter();
const config = useConfig();

const isCloseRightDisabled = computed(() => {
  if (size(store.tags.value) <= 1) {
    return true;
  }
  const tag = store.tags?.value.findIndex(item => item.path === route.path);
  return tag === size(store.tags.value) - 1;
});

const isCloseLeftDisabled = computed(() => {
  if (size(store.tags.value) <= 1) {
    return true;
  }
  const tag = store.tags?.value.findIndex(item => item.path === route.path);
  return tag === 0;
});

const isCloseOtherDisabled = computed(() => {
  return size(store.tags.value) <= 1;
});

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

function handleMenuClick(key: string) {
  const current = store.tags.value.find(item => item.path === route.path);
  if (current)
    menuHandlers.has(key) && menuHandlers.get(key)?.(current);
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
      borderBottom: `1px solid ${token?.colorBorder}`,
    }"
  >
    <div class="scroll-view">
      <transition-group name="tags">
        <ant-tag
          v-for="tag in store.tags.value"
          :key="tag.fullPath"
          :checked="route.fullPath === tag.fullPath"
          :closable="size(store.tags.value) > 1 && tag.fullPath !== route.fullPath"
          :color="route.path === tag.path ? token?.colorPrimaryActive : ''"
          @close="handleItemClose(tag)"
        >
          <router-link :to="tag.fullPath">
            {{ genTagTitle(tag) }}
          </router-link>
        </ant-tag>
      </transition-group>
    </div>
    <div class="page-tags-right">
      <ant-space>
        <ant-dropdown>
          <menu-outlined />
          <template #overlay>
            <ant-menu @click="handleMenuClick($event.key as string)">
              <ant-menu-item key="refresh">
                <template #icon>
                  <sync-outlined />
                </template>
                刷新
              </ant-menu-item>
              <ant-menu-divider />
              <ant-menu-item key="close-right" :disabled="isCloseRightDisabled">
                <template #icon>
                  <vertical-left-outlined />
                </template>
                关闭右侧
              </ant-menu-item>
              <ant-menu-item key="close-left" :disabled="isCloseLeftDisabled">
                <template #icon>
                  <vertical-right-outlined />
                </template>
                关闭左侧
              </ant-menu-item>
              <ant-menu-divider />
              <ant-menu-item key="close-other" :disabled="isCloseOtherDisabled">
                <template #icon>
                  <close-outlined />
                </template>
                关闭其他
              </ant-menu-item>
            </ant-menu>
          </template>
        </ant-dropdown>
      </ant-space>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-tags-container {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  width: 100%;
  .scroll-view{
    overflow-x: auto;
    flex: auto;
  }
  span.ant-tag {
    cursor: pointer;
  }
}

.tags-enter-active,
.tags-leave-active {
  transition: all 0.5s;
}

.tags-enter-from{
  transform: translateX(20px);
}
.tags-leave-active {
  position: absolute;
}
.tags-enter-from, .tags-leave-to {
  opacity: 0;
}
</style>
