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
            @update:value="setEmail"
            :value="me.email"
            label="Email"
            :inputOptions="{
              addLabelClasses: 'font-weight-bold',
              addWrapperClasses: 'append-label',
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
  data() {
    return {
      newEmail: "",
    };
  },
  methods: {
    setEmail(data) {
      this.newEmail = data;
    },
    changeEmail() {
      if (this.newEmail !== this.me.email && this.newEmail !== "")
        this.$store.dispatch("auth.change_email", this.newEmail);
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