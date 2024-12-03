import type { VNode } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

export interface SiderMenuProps {
  logo?: VNode | JSX.Element
  /* 侧边栏宽度 */
  siderWidth?: number
}
