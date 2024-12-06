import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

export interface GlobalConfig {
  locale: {
    locale: string
    [key: string]: unknown
  }
  theme: ThemeConfig
  t: (key: string, ...args: unknown[]) => string
}
