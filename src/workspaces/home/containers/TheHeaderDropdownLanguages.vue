<template>
<div>
  <CDropdown
    color="info"
    class="m-2"
    :toggler-text="$t('Language')"
  >
    <CDropdownItem
    :class="{active : $i18n.locale === lang.language}"
    v-for="lang in languages" :key="lang.language" :value="lang.title"
    @click="changeLocale(lang.language)"
    >
     <flag :iso="lang.flag" v-bind:squared=false class="mr-2" />
     {{$t(lang.title)}}
      </CDropdownItem>
  </CDropdown>
</div>
</template>

<script>
export default {
  name: 'language',
  data() {
    return {
      languages: [
        { flag: 'gb', language: 'en', title: 'English' },
        { flag: 'jp', language: 'ja', title: 'Japanese' },
        { flag: 'vn', language: 'vi', title: 'VietNamese' },
      ],
    };
  },
  methods: {
  changeLocale(locale) {
    this.$i18n.locale = locale;
  }
}
}
</script>
<style lang="scss" scoped>
</style>>
