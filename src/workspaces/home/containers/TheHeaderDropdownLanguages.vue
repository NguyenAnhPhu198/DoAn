<template >
  <div>
    <CDropdown class="m-2" toggler-text="Ngôn ngữ" inNav>
      <template #toggler-content>
        <CIcon :name="getFirstFlag()" class="mr-2" size="xl"
      /></template>
      <CDropdownItem
        :class="{ active: $i18n.locale === lang.language }"
        v-for="lang in languages"
        :key="lang.language"
        :value="lang.title"
        @click="changeLocale(lang)"
      >
        <CIcon :name="lang.flag" class="mr-2" size="xl" />
        {{ $t(lang.title) }}
      </CDropdownItem>
    </CDropdown>
  </div>
</template>

<script>
export default {
  name: "language",
  data() {
    return {
      languages: [
        { flag: "cifGb", language: "en", title: "English" },
        { flag: "cifJp", language: "ja", title: "Japanese" },
        { flag: "cifVn", language: "vi", title: "Vietamese" },
      ],
    };
  },
  methods: {
    changeLocale(locale) {
      localStorage.setItem("lang", locale.language);
      this.flag = locale.flag;
      this.$i18n.locale = locale.language;
      this.$store.dispatch("auth.me.fetch").then(() => {
        window.location.reload();
      });
    },
    getFirstFlag() {
      const language = this.languages.find(
        (x) => x.language === this.$i18n.locale
      );
      return language.flag;
    },
  },
};
</script>
