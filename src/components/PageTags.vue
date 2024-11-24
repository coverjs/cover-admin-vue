<script setup lang="ts">
import type { PageTagItem } from '@/types'
import type { RouteLocation } from 'vue-router'
import { useAntdToken } from '@/hooks'
import { useAppStore } from '@/store'
import { size } from 'lodash-es'

const blackList = ['/', '/login']

const appStore = useAppStore()
const route = useRoute()
const router = useRouter()
const { token } = useAntdToken()

function genTitle(route: RouteLocation) {
  return route.meta?.title
}

function handleItemClose(tag: PageTagItem) {
  appStore.removeTag(tag)
}

const menuHandlers = new Map<string, (tag: PageTagItem) => void>()
menuHandlers.set('refresh', () => {
  router.go(0)
})

menuHandlers.set('close-right', (tag: PageTagItem) => {
  const index = appStore.tags.indexOf(tag)
  const target = appStore.tags.filter((_, idx) => idx > index)

  appStore.removeTags(target)
})

menuHandlers.set('close-left', (tag: PageTagItem) => {
  const index = appStore.tags.indexOf(tag)
  const target = appStore.tags.filter((_, idx) => idx < index)
  appStore.removeTags(target)
})

menuHandlers.set('close-other', (tag: PageTagItem) => {
  const target = appStore.tags.filter(item => item.fullPath !== tag.fullPath)
  appStore.removeTags(target)
})

function handleMenuClick(key: string, tag: PageTagItem) {
  menuHandlers.has(key) && menuHandlers.get(key)?.(tag)
}

watch(
  route,
  (to) => {
    const title = genTitle(to)

    if (blackList.includes(to.path) || !title)
      return

    const { fullPath, meta, name, params, path, query } = to
    appStore.addTag({ title, name, path, fullPath, meta, params, query })
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div
    class="page-tags-container"
    :style="{
      background: token.colorBgContainer,
      borderTop: `1px solid ${token.colorBorder}`,
    }"
  >
    <a-dropdown
      v-for="tag in appStore.tags"
      :key="tag.fullPath"
      :trigger="['contextmenu']"
    >
      <a-tag
        :key="tag.fullPath"
        :checked="route.fullPath === tag.fullPath"
        :closable="size(appStore.tags) > 1 && tag.fullPath !== route.fullPath"
        :color="route.fullPath === tag.fullPath ? token.colorPrimaryActive : ''"
        @close="handleItemClose(tag)"
      >
        <router-link :to="tag.fullPath">
          {{ tag.title }}
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
