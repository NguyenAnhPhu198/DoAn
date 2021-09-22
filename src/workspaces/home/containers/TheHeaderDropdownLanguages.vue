<template>
  <div>
    <CDropdown color="info" class="m-2" :toggler-text="$t('Language')">
      <CDropdownItem
        :class="{ active: $i18n.locale === lang.language }"
        v-for="lang in languages"
        :key="lang.language"
        :value="lang.title"
        @click="changeLocale(lang.language)"
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
        { flag: "cifVn", language: "vi", title: "VietNamese" },
      ],
    };
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>
