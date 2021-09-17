<template>
  <CCard>
    <CCardHeader>
      <TMessage content="User info" class="d-inline-flex mr-2" bold />
      <SMessageUserStatus :id="status" />
      <div class="float-right">
        <SButtonResendVerificationEmail v-if="!me.email_verified" />
        <SButtonResetPassword class="ml-2" />
      </div>
    </CCardHeader>
    <CCardBody>
      <CRow class="m-lg-1">
        <CCol sm="12" class="mb-3">
          <TInputText
            :value="me.id"
            :inputOptions="{
              readonly: true,
              prepend: 'ID',
              addLabelClasses: 'font-weight-bold',
            }"
            label="User id"
          />
        </CCol>
        <CCol sm="12" class="mb-3">
          <TInputEmail
            :value="me.email"
            label="Email address"
            :inputOptions="{
              addLabelClasses: 'font-weight-bold',
            }"
            savable
            @click-save="changeEmail"
          />
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  methods: {
    changeEmail(email) {
      if (email !== this.me.email && email !== "") {
        this.$store.dispatch("auth.me.update_email", email);
      }
    },
  },
  computed: {
    me() {
      return this.$store.getters["auth.me"];
    },
    status() {
      return this.me.email_verified ? "verified" : "unverified";
    },
  },
};
</script>