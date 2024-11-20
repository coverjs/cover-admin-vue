import type { LayoutSetting } from '@/types';

export const defaultLayoutSetting: LayoutSetting = {
  theme: 'light',
  colorPrimary: '#722ED1',
  headerHeight: 64,
} as const;

export default defaultLayoutSetting;
