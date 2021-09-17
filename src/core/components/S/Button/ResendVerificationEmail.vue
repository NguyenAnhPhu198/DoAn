<template>
  <CButton color="primary" @click="sendEmailVerify()">
    <TMessage content="Resend verification email" />
  </CButton>
</template>
<script>
export default {
  methods: {
    sendEmailVerify() {
      this.$store.dispatch("auth.me.send_mail.verification");
    },
  },
};
</script>