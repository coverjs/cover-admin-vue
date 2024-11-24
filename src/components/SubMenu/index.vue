<script setup lang="ts">
import type { MenuDataItem } from '@/router/types.ts'
import AsyncIcon from '@/components/SubMenu/AsyncIcon.vue'

defineOptions({
  name: 'SubMenu',
})
withDefaults(
  defineProps<{
    item: MenuDataItem
    link?: boolean
  }>(),
  {
    link: true,
  },
)
const { t } = useI18n()
</script>

<template>
  <template v-if="item.children">
    <a-sub-menu :key="item.path">
      <template v-if="item.icon" #icon>
        <AsyncIcon :icon="item.icon" />
      </template>
      <template #title>
        {{ t(item.locale!) || item.name }}
      </template>
      <template v-for="menu in item.children">
        <template v-if="menu.children">
          <sub-menu :key="menu.path" :item="menu" />
        </template>
        <template v-else>
          <a-menu-item v-if="menu.type === 'MENU'" :key="menu.path">
            <template v-if="menu.icon" #icon>
              <AsyncIcon :icon="menu.icon" />
            </template>
            <RouterLink v-if="link" :to="menu.path">
              {{ t(menu.locale!) || menu.name }}
            </RouterLink>
          </a-menu-item>
        </template>
      </template>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="item.path">
      <template v-if="item.icon" #icon>
        <AsyncIcon :icon="item.icon" />
      </template>
      <RouterLink v-if="link" :to="item.path">
        {{ t(item.locale!) || item.name }}
      </RouterLink>
    </a-menu-item>
  </template>
</template>

<style scoped lang="scss"></style>
