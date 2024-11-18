<script setup lang="ts">
import { MenuDataItem } from '@/router/types.ts';

defineOptions({
  name: 'SubMenu',
});
withDefaults(defineProps<{ item: MenuDataItem, link?: boolean }>(), {
  link: true,
});


</script>

<template>
  <template v-if="item.children">
    <a-sub-menu :key="item.path">
      <template v-if="item.icon" #icon>
        <AsyncIcon :icon="item.icon" />
      </template>
      <template #title>
        {{ item.name }}
      </template>
      <template v-for="menu in item.children">
        <template v-if="menu.children">
          <SubMenu :key="menu.path" :item="menu" />
        </template>
        <template v-else>
          <a-menu-item :key="menu.path" v-if="menu.type === 'MENU'">
            <template v-if="menu.icon" #icon>
                <AsyncIcon :icon="menu.icon" />
              </template>
            <RouterLink v-if="link" :to="menu.path">
              {{ menu.name }}
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
        {{ item.name }}
      </RouterLink>
    </a-menu-item>
  </template>
</template>

<style scoped lang="scss">

</style>
