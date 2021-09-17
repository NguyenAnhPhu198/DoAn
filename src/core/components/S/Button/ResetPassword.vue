<template>
  <CButton :disabled="sending" color="primary" @click="resetPassword()">
    <TMessage content="Reset password" />
  </CButton>
</template>
<script>
export default {
  data() {
    return {
      sending: false,
    };
  },
  methods: {
    resetPassword() {
      this.sending = true;
      this.$store.dispatch("auth.me.send_mail.reset_password").finally(() => {
        this.sending = false;
      });
    },
  },
};
</script>