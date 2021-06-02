import VueI18n from 'vue-i18n'
import en from "@/config/languages/en";
import vi from "@/config/languages/vi";
import ja from "@/config/languages/ja";
import Vue from 'vue'

const messages = { en, vi, ja };
Vue.use(VueI18n)

export default new VueI18n({
  locale: getBrowserLocale(),
  fallbackLocale: 'en',
  messages,
})

export function getBrowserLocale() {
  const navigatorLocale =
    navigator.languages !== undefined ?
      navigator.languages[0] :
      navigator.language

  if (!navigatorLocale) {
    return undefined
  }

  return navigatorLocale.trim().split(/-|_/)[0]
}