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
  './langs/global/**/*.json',
  './langs/pages/**/*.json',
]);

const localesMap = loadLocalesMap(modules);

function loadLocalesMap(modules: Record<string, () => Promise<unknown>>) {
  const result: Record<
    string,
    () => Promise<{ default: Record<string, string> }>
  > = {};

  each(modules, (loadLocale, path) => {
    const key = path.match(/([\w-]*)\.(yaml|yml|json)/)?.[1];
    if (!key)
      return;

    if (!result[key]) {
      // 如果没有加载函数，直接赋值
      result[key] = async () => {
        const defaultMessages = {};
        const messages = await loadLocale() as unknown as { default: Record<string, string> }; ;
        return { default: Object.assign(defaultMessages, messages.default) };
      };
    }
    else {
      // 如果有加载函数，合并加载函数
      const previousLoader = result[key];
      result[key] = async () => {
        const defaultMessages = {};
        const previousMessages = await previousLoader();
        const currentMessages = await loadLocale() as unknown as { default: Record<string, string> };
        return {
          default: Object.assign(
            defaultMessages,
            previousMessages.default,
            currentMessages.default
          ),
        };
      };
    }
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
