<template>
  <CButton color="primary" @click="sendEmailVerify()">
    {{ $t("Resend verification email") }}
  </CButton>
</template>
<script>

export default {
  methods: {
    sendEmailVerify() {
      this.$store.dispatch("auth.send_email_verify");
    },
  },
};
</script>