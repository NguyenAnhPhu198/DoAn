<template >
  <CDropdown
    in-nav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <CIcon :name="getActiveLocale().flag" size="lg" />
      </CHeaderNavLink>
    </template>
    <CDropdownItem
      v-for="locale in locales"
      :key="locale.id"
      @click="updateLocale(locale)"
      :disabled="locale.id === getActiveLocale().id"
    >
      <CIcon :name="locale.flag" size="lg" class="mr-1" />
      <TMessage :content="locale.name" noTranslate />
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import { setRememberLocale, getActiveLocale, locales } from "@/core/plugins/i18n";

export default {
  data() {
    return {
      locales: locales,
    };
  },
  methods: {
    updateLocale(locale) {
      setRememberLocale(locale.id);
      window.location.reload();
    },
    getActiveLocale() {
      return this.locales.find((locale) => locale.id === getActiveLocale());
    },
  },
};
</script>
