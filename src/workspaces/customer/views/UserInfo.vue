<template>
  <CCard>
    <CCardHeader>
      <TMessage content="User info" class="d-inline-flex mr-2" bold />
      <SMessageUserStatus :id="userStatus" />
      <div class="float-right">
        <SButtonResendVerificationEmail v-if="!auth.email_verified" />
        <SButtonResetPassword class="ml-2" />
      </div>
    </CCardHeader>
    <CCardBody>
      <CRow class="m-lg-1">
        <CCol sm="12" class="mb-3">
          <TInputText
            :value="auth.id"
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
            :value="auth.email"
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
import authenMixin from "../mixins/authentication";
export default {
  mixins: [authenMixin],
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
      if (this.newEmail !== this.auth.email && this.newEmail !== "")
        this.$store.dispatch("auth.change_email", this.newEmail);
    },
  },
  computed: {
    userStatus() {
      return this.auth.email_verified ? "verified" : "unverified";
    },
  },
};
</script>