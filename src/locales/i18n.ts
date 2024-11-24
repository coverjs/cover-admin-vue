import type { LanguagesType } from './types'
import { each } from 'lodash-es'
import { createI18n } from 'vue-i18n'

const loadedLangs = new Set<string>()

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: '',
  messages: {},
})

const modules = import.meta.glob('./langs/*.json')

const localesMap = loadLocalesMap(modules)

function loadLocalesMap(modules: Record<string, () => Promise<unknown>>) {
  const result: Record<
    string,
    () => Promise<{ default: Record<string, string> }>
  > = {}
  each(modules, (loadLocale, path) => {
    const key = path.match(/([\w-]*)\.(yaml|yml|json)/)?.[1]
    if (!key)
      return
    result[key] = loadLocale as () => Promise<{
      default: Record<string, string>
    }>
  })
  return result
}

export function setI18nLang(locale: LanguagesType) {
  i18n.global.locale.value = locale
}

export async function loadI18nMsgs(lang: LanguagesType) {
  if (unref(i18n.global.locale) === lang || loadedLangs.has(lang))
    return setI18nLang(lang)
  const messages = await localesMap[lang]?.()

  if (messages?.default) {
    i18n.global.setLocaleMessage(lang, messages.default)
  }
  loadedLangs.add(lang)
  return setI18nLang(lang)
}
