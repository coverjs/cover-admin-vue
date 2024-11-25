export type ThemeType = 'light' | 'dark';

export interface LayoutSetting {
  theme: ThemeType // 主题
  colorPrimary?: string // 主题色
  headerHeight?: number // 头部高度
}
