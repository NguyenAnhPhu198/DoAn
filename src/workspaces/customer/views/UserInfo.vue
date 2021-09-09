<template>
  <CCard>
    <CCardHeader class="justify-content-between d-flex flex-wrap">
      <CRow class="ml-1">
        <TMessage content="User info" />
        <CCol>
          <SMessageUserStatus :type="auth.email_verified" />
        </CCol>
      </CRow>
      <CRow class="mx-1 mt-sm-0 mt-2">
        <SButtonChangeEmail
          color="primary"
          @click="changeEmail"
          content="Change email"
        />
        <SButtonResetPassword
          class="ml-3"
          :timeout="1500"
          color="primary"
          content="Reset password"
          @click="resetPassword"
        />
      </CRow>
    </CCardHeader>
    <CCardBody>
      <CRow class="m-lg-1">
        <CCol sm="12" class="mb-3">
          <TInputText
            :value="auth.id"
            :inputOptions="{ readonly: true, prepend: 'ID' }"
            label="User id"
          />
        </CCol>
        <CCol sm="12" class="mb-3">
          <TInputEmail
            @update:value="setEmail"
            :value="auth.email"
            label="Email"
          />
        </CCol>
        <CCol sm="12" class="mb-3"> </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
import authenMixin from "../mixins/authentication";
export default {
  mixins: [authenMixin],
  data() {
    return {
      new_email: "",
    };
  },
  methods: {
    setEmail(data) {
      this.new_email = data;
    },
    resetPassword() {
      this.$store.dispatch("auth.reset_password", this.auth.email);
    },
    changeEmail() {
      if (this.new_email !== this.auth.email && this.new_email !== '')
        this.$store.dispatch("auth.change_email", this.new_email);
    },
  },
};
</script>
