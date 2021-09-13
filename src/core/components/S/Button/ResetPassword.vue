<template>
  <CButton color="primary" @click="resetPassword()">
    {{ $t("Reset password") }}
  </CButton>
</template>
<script>

import authenMixin from "@/workspaces/customer/mixins/authentication";
export default {
  mixins: [authenMixin],
  methods: {
    resetPassword() {
      this.$store.dispatch("auth.reset_password", this.auth.email);
    },
  },
};
</script>