<template>
  <CButton :disabled="sending" color="primary" @click="sendEmailVerify()">
    <TMessage content="Resend verification email" />
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
    sendEmailVerify() {
      this.sending = true;
      this.$store.dispatch("auth.me.send_mail.verification").finally(() => {
        this.sending = false;
      });
    },
  },
};
</script>