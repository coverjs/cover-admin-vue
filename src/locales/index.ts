import type { Locale } from 'ant-design-vue/es/locale';
import type { App } from 'vue';
import type { LanguagesType } from './types';

import { CacheEnum } from '@/enums';
import { genStorageKey } from '@/utils';
import antdEnLocale from 'ant-design-vue/es/locale/en_US';

import antdZhLocale from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import { i18n, loadI18nMsgs } from './i18n';

const dayjsLocaleMap = new Map([
  ['zh-CN', async () => await import('dayjs/locale/zh-cn')],
  ['en-US', async () => await import('dayjs/locale/en')],
]);
const antdLocaleMap = new Map([
  ['zh-CN', antdZhLocale],
  ['en-US', antdEnLocale],
]);

export const antdLocale = ref<Locale>(antdZhLocale);

async function loadAntdLocale(lang: LanguagesType) {
  const locale = antdLocaleMap.get(lang) ?? antdZhLocale;
  if (!locale)
    return;
  antdLocale.value = locale;
}

async function loadDayjsLocale(lang: LanguagesType) {
  const locale
    = (await dayjsLocaleMap.get(lang)?.())
    ?? (await import('dayjs/locale/zh-cn'));
  dayjs.locale(locale);
}
async function loadThirdPartyMsgs(lang: LanguagesType) {
  await Promise.all([loadAntdLocale(lang), loadDayjsLocale(lang)]);
}

export async function loadMessages(lang: LanguagesType) {
  await Promise.all([loadI18nMsgs(lang), loadThirdPartyMsgs(lang)]);
}

export async function setupLocale(
  app: App,
  defaultLang: LanguagesType = 'zh-CN',
) {
  app.use(i18n);

  const localeStorage = useLocalStorage(
    genStorageKey(CacheEnum.LOCALE_KEY),
    defaultLang,
  );
  await loadMessages(localeStorage.value as LanguagesType);
}

export const t = i18n.global.t as (key: string, ...args: unknown[]) => string;

// 当前语言
export const lang = i18n.global.locale as Ref<LanguagesType>;

export default setupLocale;
