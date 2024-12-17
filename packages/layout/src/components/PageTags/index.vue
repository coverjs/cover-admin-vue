<script setup lang="tsx">
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import type { PageTagItem } from './types';
import { CloseOutlined, MenuOutlined, SyncOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons-vue';
import { Dropdown as AntDropdown, Menu as AntMenu, MenuDivider as AntMenuDivider, MenuItem as AntMenuItem, Space as AntSpace, Tag as AntTag, theme } from 'ant-design-vue';
import { isEmpty, isNil, last, size, split } from 'lodash-es';
import { computed, ref, type Ref } from 'vue';
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

function isTagCloseRightDisabled(tag: PageTagItem) {
  if (size(store.tags.value) <= 1) {
    return true;
  }
  const idx = store.tags?.value.findIndex(item => item.path === tag.path);
  return idx === size(store.tags.value) - 1;
}

function isTagCloseLeftDisabled(tag: PageTagItem) {
  if (size(store.tags.value) <= 1) {
    return true;
  }
  const idx = store.tags?.value.findIndex(item => item.path === tag.path);
  return idx === 0;
}

function handleItemClose(tag: PageTagItem) {
  store.removeTag(tag);
}

const menuHandlers = new Map<string, (tag: PageTagItem) => void>();
menuHandlers.set('refresh', () => {
  store.refreshTag(router);
});

menuHandlers.set('close-right', (tag: PageTagItem) => {
  const index = store.tags.value.findIndex(item => item.path === tag.path);
  const target = store.tags.value.filter((_, idx) => idx > index);
  const current = router.currentRoute.value;
  store.removeTags(target);
  if (target.some(item => item.path === current.path)) {
    router.push(store.tags.value[store.tags.value.length - 1].path);
  }
});

menuHandlers.set('close-left', (tag: PageTagItem) => {
  const index = store.tags.value.findIndex(item => item.path === tag.path);
  const target = store.tags.value.filter((_, idx) => idx < index);
  const current = router.currentRoute.value;
  store.removeTags(target);
  if (target.some(item => item.path === current.path)) {
    router.push(store.tags.value[0].path);
  }
});

menuHandlers.set('close-other', (tag: PageTagItem) => {
  const target = store.tags.value.filter(item => item.path !== tag.path);
  const current = router.currentRoute.value;
  store.removeTags(target);
  if (target.some(item => item.path === current.path)) {
    router.push(store.tags.value[0].path);
  }
});

function handleMenuClick(key: string, tag?: PageTagItem) {
  const target = isNil(tag) ? store.tags.value.find(item => item.path === route.path) : tag;
  if (target)
    menuHandlers.has(key) && menuHandlers.get(key)?.(target);
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

const contextmenuTag: Ref<PageTagItem | void> = ref(void 0);
function DropdownMenu(tag?: PageTagItem) {
  const hasTag = !isEmpty(tag?.path);
  return (
    <AntMenu onClick={(e: MenuInfo) => handleMenuClick(e.key as string, hasTag ? tag : void 0)} selectedKeys={[]}>
      <AntMenuItem key="refresh" icon={<SyncOutlined />} disabled={hasTag ? route.path !== tag?.path : false}>刷新</AntMenuItem>
      <AntMenuDivider />
      <AntMenuItem key="close-right" icon={<VerticalLeftOutlined />} disabled={hasTag ? isTagCloseRightDisabled(tag!) : isCloseRightDisabled.value}>关闭右侧</AntMenuItem>
      <AntMenuItem key="close-left" icon={<VerticalRightOutlined />} disabled={hasTag ? isTagCloseLeftDisabled(tag!) : isCloseLeftDisabled.value}>关闭左侧</AntMenuItem>
      <AntMenuDivider />
      <AntMenuItem key="close-other" icon={<CloseOutlined />} disabled={isCloseOtherDisabled.value}>关闭其他</AntMenuItem>
    </AntMenu>
  );
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
    <ant-dropdown :trigger="['contextmenu']">
      <div class="scroll-view">
        <transition-group name="tags">
          <ant-tag
            v-for="tag in store.tags.value"
            :key="tag.fullPath"
            :checked="route.fullPath === tag.fullPath"
            :closable="size(store.tags.value) > 1 && tag.fullPath !== route.fullPath"
            :color="route.path === tag.path ? token?.colorPrimaryActive : ''"
            @close="handleItemClose(tag)"
            @contextmenu="contextmenuTag = tag"
          >
            <router-link :to="tag.fullPath">
              {{ genTagTitle(tag) }}
            </router-link>
          </ant-tag>
        </transition-group>
      </div>
      <template #overlay>
        <dropdown-menu v-bind="contextmenuTag" />
      </template>
    </ant-dropdown>
    <div class="page-tags-right">
      <ant-space>
        <ant-dropdown>
          <menu-outlined />
          <template #overlay>
            <dropdown-menu />
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
  justify-content: space-between;
  .scroll-view{
    overflow-x: hidden;
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
  transform: translateX(40px);
}
.tags-leave-active {
  position: absolute;
}
.tags-enter-from, .tags-leave-to {
  opacity: 0;
}
</style>
