<script setup lang="tsx">
import type { MenuData, MenuDataItem } from './types';
import { Menu as AntMenu, MenuItem as AntMenuItem, SubMenu } from 'ant-design-vue';
import { RouterLink, useRoute } from 'vue-router';
import AsyncIcon from '../AsyncIcon.vue';
import { type GlobalConfig, useConfig } from '../ConfigProvider';

defineOptions({ name: 'SiderMenu' });
defineProps<{
  menuData?: MenuData
  openKyes: string[]
}>();

const { t } = useConfig() as GlobalConfig;
const route = useRoute();

function MenuItem(item: MenuDataItem) {
  if (item.children) {
    return (
      <SubMenu
        key={item.path}
        icon={item.icon ? <AsyncIcon icon={item.icon} /> : void 0}
        title={t(item.locale!) || item.name}
      >
        {
          item.children.map(MenuItem)
        }
      </SubMenu>
    );
  }
  return (
    <AntMenuItem
      key={item.path}
      icon={item.icon ? <AsyncIcon icon={item.icon} /> : void 0}
    >
      <RouterLink to={item.path}>{t(item.locale!) || item.name}</RouterLink>
    </AntMenuItem>
  );
}
</script>

<template>
  <ant-menu :open-keys="openKyes" :selected-keys="[route.path]" mode="inline">
    <template v-for="item in menuData" :key="item.path">
      <menu-item v-bind="item" />
    </template>
  </ant-menu>
</template>
