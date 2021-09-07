<template>
  <CCard>
    <CCardHeader>
      <CRow class="m-lg-1 justify-content-between">
        <TMessage :content="$t('Password change')" />
        <CLoadingButton
          timeout="1500"
          color="primary"
          class="ml-3"
          @click.native="send"
        >
          {{ $t("Password reset") }}</CLoadingButton
        >
      </CRow>
    </CCardHeader>
  </CCard>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    send() {
      this.$store.dispatch("auth.reset_password", this.auth.email);
    },
  },
  computed: {
    ...mapGetters({
      auth: "auth.me",
    }),
  },
};
</script>
