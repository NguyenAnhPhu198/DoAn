<template>
  <CButton color="primary" @click="resetPassword()">
    <TMessage content="Reset password" />
  </CButton>
</template>
<script>
export default {
  methods: {
    resetPassword() {
      this.$store.dispatch("auth.me.send_mail.reset_password");
    },
  },
};
</script>