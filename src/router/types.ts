import { VNodeChild } from 'vue';

export interface MenuDataItem {
  // 唯一id
  id?: string | number;
  // 标题
  title: string | (() => VNodeChild);
  // 图标
  icon?: string;
  // 地址
  path: string;
  // 绑定的哪个组件
  component?: string;
  // 子集菜单
  children?: MenuDataItem[];
  // 同路由中的name
  name?: string;
  // 菜单类型
  type?: 'DIRECTORY' | 'MENU' | 'ACTION';
}

export type MenuData = MenuDataItem[];
