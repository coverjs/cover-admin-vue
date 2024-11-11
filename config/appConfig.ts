import type { LayoutSetting } from '@/types';

export const defaultLayoutSetting: LayoutSetting = {
  theme: 'light',
  colorPrimary: '#1677FF',
  headerHeight: 64,
} as const;

export default defaultLayoutSetting;
