<template>
  <CCard>
    <CCardHeader>
      <TMessage content="User info" class="d-inline-flex mr-2" bold />
      <SMessageUserStatus :type="auth.email_verified" />
      <div class="float-right">
        <SButtonResetPassword
          class="ml-3"
          :timeout="1500"
          color="primary"
          content="Reset password"
          @click="resetPassword"
        />
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
            @update="setEmail"
            :value="auth.email"
            label="Email"
            :inputOptions="{
              addLabelClasses: 'font-weight-bold',
              addWrapperClasses: 'append-label',
            }"
          >
            <slot>
              <TButtonSave
                @click="changeEmail"
              />
            </slot>
          </TInputEmail>
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
      if (this.new_email !== this.auth.email && this.new_email !== "")
        this.$store.dispatch("auth.change_email", this.new_email);
    },
  },
};
</script>
<style lang="css">
.mt-5 .input-group-text {
  padding: 0px;
}
</style>