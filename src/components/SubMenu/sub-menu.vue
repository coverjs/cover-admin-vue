<script setup lang="ts">
import { MenuDataItem } from '@/router/types.ts';

defineOptions({
  name: 'SubMenu',
});
defineProps<{ item: MenuDataItem, link?: boolean }>();

</script>

<template>
  <template v-if="item.children">
    <a-sub-menu :key="item.path">
      <template #title>
        {{ item.name }}
      </template>
      <template v-for="menu in item.children">
        <template v-if="menu.children">
          <sub-menu :key="menu.path" :item="menu" />
        </template>
        <template v-else>
          <a-menu-item :key="menu.path" v-if="menu.type === 'MENU'" @click="$router.push(menu.path)">
            {{ menu.name }}
          </a-menu-item>
        </template>
      </template>
    </a-sub-menu>
  </template>
  <template v-else>
    <a-menu-item :key="item.path" @click="$router.push(item.path)">
      <template>
        {{ item.name }}
      </template>
    </a-menu-item>
  </template>
</template>

<style scoped lang="scss">

</style>
