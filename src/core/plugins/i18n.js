import VueI18n from 'vue-i18n'
import en from "@/mixins/languages/en";
import vi from "@/mixins/languages/vi";
import ja from "@/mixins/languages/ja";
import Vue from 'vue'

const messages = { en, vi, ja };
Vue.use(VueI18n)
let lang = localStorage.getItem('lang');
lang = lang ? lang: getBrowserLocale();
export default new VueI18n({
  locale: lang,
  fallbackLocale: lang,
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
