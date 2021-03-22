import Vue from 'vue'
import VueI18n from 'vue-i18n'

import _en from "./languages/en";
import _vi from "./languages/vi";
import _ja from "./languages/ja";

import en from "@/config/languages/en";
import vi from "@/config/languages/vi";
import ja from "@/config/languages/ja";

Vue.use(VueI18n)

let messages = {
  en: { ..._en, ...en },
  vi: { ..._vi, ...vi },
  ja: { ..._ja, ...ja }
};

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
