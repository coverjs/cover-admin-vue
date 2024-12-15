import presetIcons from '@unocss/preset-icons';
// 适用于 @apply、@screen 和 theme() 指令的 UnoCSS 转换器
import transformerDirectives from '@unocss/transformer-directives';
// 为 UnoCSS 启用 Windi CSS 的 变体组特性。
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { defineConfig, presetUno } from 'unocss';
import { icons } from './src/pages/system/menu/utils';

export default defineConfig({
  presets: [
    presetIcons({
      warn: true,
      collections: {
        'ant-design': () => import('@iconify-json/ant-design/icons.json').then(i => i.default),
      }
    }),
    presetUno(),
  ],
  theme: {
    colors: {
      primary: 'var(--cover-admin-color-primary)',
      success: 'var(--cover-admin-color-success)',
      warning: 'var(--cover-admin-color-warning)',
      error: 'var(--cover-admin-color-error)',
      info: 'var(--cover-admin-color-info)',
      textBase: 'var(--cover-admin-color-text-base)',
      bgBase: 'var(--cover-admin-color-bg-base)',
      text: 'var(--cover-admin-color-text)',
      textSecondary: 'var(--cover-admin-color-text-secondary)',
      textTertiary: 'var(--cover-admin-color-text-tertiary)',
      textQuaternary: 'var(--cover-admin-color-text-quaternary)',
      fill: 'var(--cover-admin-color-fill)',
      fillSecondary: 'var(--cover-admin-color-fill-secondary)',
      fillTertiary: 'var(--cover-admin-color-fill-tertiary)',
      fillQuaternary: 'var(--cover-admin-color-fill-quaternary)',
      bgLayout: 'var(--cover-admin-color-bg-layout)',
      bgContainer: 'var(--cover-admin-color-bg-container)',
      bgElevated: 'var(--cover-admin-color-bg-elevated)',
      bgSpotlight: 'var(--cover-admin-color-bg-spotlight)',
      border: 'var(--cover-admin-color-border)',
      borderSecondary: 'var(--cover-admin-color-border-secondary)',
      primaryBg: 'var(--cover-admin-color-primary-bg)',
      primaryBgHover: 'var(--cover-admin-color-primary-bg-hover)',
      primaryBorder: 'var(--cover-admin-color-primary-border)',
      primaryBorderHover: 'var(--cover-admin-color-primary-border-hover)',
      primaryHover: 'var(--cover-admin-color-primary-hover)',
      primaryActive: 'var(--cover-admin-color-primary-active)',
      primaryTextHover: 'var(--cover-admin-color-primary-text-hover)',
      primaryText: 'var(--cover-admin-color-primary-text)',
      primaryTextActive: 'var(--cover-admin-color-primary-text-active)',
      successBg: 'var(--cover-admin-color-success-bg)',
      successBgHover: 'var(--cover-admin-color-success-bg-hover)',
      successBorder: 'var(--cover-admin-color-success-border)',
      successBorderHover: 'var(--cover-admin-color-success-border-hover)',
      successHover: 'var(--cover-admin-color-success-hover)',
      successActive: 'var(--cover-admin-color-success-active)',
      successTextHover: 'var(--cover-admin-color-success-text-hover)',
      successText: 'var(--cover-admin-color-success-text)',
      successTextActive: 'var(--cover-admin-color-success-text-active)',
      errorBg: 'var(--cover-admin-color-error-bg)',
      errorBgHover: 'var(--cover-admin-color-error-bg-hover)',
      errorBorder: 'var(--cover-admin-color-error-border)',
      errorBorderHover: 'var(--cover-admin-color-error-border-hover)',
      errorHover: 'var(--cover-admin-color-error-hover)',
      errorActive: 'var(--cover-admin-color-error-active)',
      errorTextHover: 'var(--cover-admin-color-error-text-hover)',
      errorText: 'var(--cover-admin-color-error-text)',
      errorTextActive: 'var(--cover-admin-color-error-text-active)',
      warningBg: 'var(--cover-admin-color-warning-bg)',
      warningBgHover: 'var(--cover-admin-color-warning-bg-hover)',
      warningBorder: 'var(--cover-admin-color-warning-border)',
      warningBorderHover: 'var(--cover-admin-color-warning-border-hover)',
      warningHover: 'var(--cover-admin-color-warning-hover)',
      warningActive: 'var(--cover-admin-color-warning-active)',
      warningTextHover: 'var(--cover-admin-color-warning-text-hover)',
      warningText: 'var(--cover-admin-color-warning-text)',
      warningTextActive: 'var(--cover-admin-color-warning-text-active)',
      infoBg: 'var(--cover-admin-color-info-bg)',
      infoBgHover: 'var(--cover-admin-color-info-bg-hover)',
      infoBorder: 'var(--cover-admin-color-info-border)',
      infoBorderHover: 'var(--cover-admin-color-info-border-hover)',
      infoHover: 'var(--cover-admin-color-info-hover)',
      infoActive: 'var(--cover-admin-color-info-active)',
      infoTextHover: 'var(--cover-admin-color-info-text-hover)',
      infoText: 'var(--cover-admin-color-info-text)',
      infoTextActive: 'var(--cover-admin-color-info-text-active)',
      bgMask: 'var(--cover-admin-color-bg-mask)',
      white: 'var(--cover-admin-color-white)'
    }
  },
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['flex-between', 'flex items-center justify-between'],
    ['flex-end', 'flex items-end justify-between'],
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: icons
});
