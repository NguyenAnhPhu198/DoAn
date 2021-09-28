import VueI18n from "vue-i18n";
import en from "@/mixins/languages/en";
import vi from "@/mixins/languages/vi";
import ja from "@/mixins/languages/ja";
import Vue from "vue";

Vue.use(VueI18n);

const messages = { en, vi, ja };

const fallback = "en";

export const locales = [
  { id: "en", name: "English", flag: "cif-gb" },
  { id: "ja", name: "Japanese", flag: "cif-jp" },
  { id: "vi", name: "Vietnamese", flag: "cif-vn" },
]

export default new VueI18n({
  locale: getActiveLocale(),
  fallbackLocale: fallback,
  messages,
})

export function getActiveLocale() {
  const locale = getRememberLocale() ?? getBrowserLocale();
  const included = locales.some(item => item.id === locale);
  return included ? locale : fallback;
}

function getBrowserLocale() {
  const navigatorLocale =
    navigator.languages !== undefined
      ? navigator.languages[0]
      : navigator.language;

  if (!navigatorLocale) {
    return undefined;
  }

  return navigatorLocale.trim().split(/-|_/)[0];
}

function getRememberLocale() {
  return localStorage.getItem("locale");
}

export function setRememberLocale(locale) {
  localStorage.setItem("locale", locale)
}
