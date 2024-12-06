import type { LanguagesType } from './types';
import { each } from 'lodash-es';
import { createI18n } from 'vue-i18n';

const loadedLangs = new Set<string>();

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: '',
  messages: {},
});

const modules = import.meta.glob([
  './langs/en-US/**/*.json',
  './langs/zh-CN/**/*.json',
]);

const localesMap = loadLocalesMap(modules);

function loadLocalesMap(modules: Record<string, () => Promise<unknown>>) {
  const result: Record<
    string,
    () => Promise<{ default: Record<string, Record<string, string>> }>
  > = {};

  each(modules, (loadLocale, path) => {
    // 提取语言代码（zh-CN, en-US）
    const langKey = path.match(/langs\/([\w-]*)\//)?.[1];
    if (!langKey)
      return;

    // 提取顶层命名空间（文件名，如 app, widgets）
    const namespace = path.match(/\/([\w-]*)\.json$/)?.[1];
    if (!namespace)
      return;

    if (!result[langKey]) {
      result[langKey] = async () => ({ default: {} });
    }

    const previousLoader = result[langKey];
    result[langKey] = async () => {
      const defaultMessages = await previousLoader();
      const currentMessages = await loadLocale() as unknown as { default: Record<string, string> }; ;
      return {
        default: {
          ...defaultMessages.default,
          [namespace]: currentMessages.default,
        },
      };
    };
  });
  return result;
}

export function setI18nLang(locale: LanguagesType) {
  i18n.global.locale.value = locale;
}

export async function loadI18nMsgs(lang: LanguagesType) {
  if (unref(i18n.global.locale) === lang || loadedLangs.has(lang))
    return setI18nLang(lang);

  const messages = await localesMap[lang]?.();

  if (messages?.default) {
    i18n.global.setLocaleMessage(lang, messages.default);
  }
  loadedLangs.add(lang);
  return setI18nLang(lang);
}
