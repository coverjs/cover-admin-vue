<script setup lang="tsx">
import type { MenuData, MenuDataItem } from './types';
import { Menu as AntMenu, MenuItem as AntMenuItem, SubMenu as AntSubMenu } from 'ant-design-vue';
import { RouterLink, useRoute } from 'vue-router';
import { type GlobalConfig, useConfig } from '../ConfigProvider';
import SvgIcon from '../SvgIcon.vue';

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
      <AntSubMenu
        key={item.path}
        icon={item.icon ? <SvgIcon name={item.icon} /> : void 0}
        title={t(item.locale!) || item.name}
      >
        {
          item.children.map(MenuItem)
        }
      </AntSubMenu>
    );
  }
  return (
    <AntMenuItem
      key={item.path}
      icon={item.icon ? <SvgIcon name={item.icon} /> : void 0}
    >
      <RouterLink to={item.path}>{t(item.locale!) || item.name}</RouterLink>
    </AntMenuItem>
  );
}
</script>

<template>
  <ant-menu :open-keys="openKyes" :selected-keys="[route.path]" mode="inline">
    <menu-item v-for="item in menuData" :key="item.path" v-bind="item" />
  </ant-menu>
</template>
