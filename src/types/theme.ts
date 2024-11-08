export type ThemeType = 'light' | 'dark';

export interface LayoutSetting {
  theme: ThemeType; // 主题
  colorPrimary?: string;
}
