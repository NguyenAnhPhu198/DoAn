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
          @click="openModal = true"
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
            :value="auth.email"
            :inputOptions="{ readonly: true }"
            label="Email"
          />
        </CCol>
        <CCol sm="12" class="mb-3">
          <SModalChangeEmail
            title="Change email"
            @click-create="confirm"
            :show.sync="openModal"
            :creating="false"
            accept
          >
            <slot>
              <TInputEmail @update:value="setEmail" label="New email" />
              <TInputPassword
                @update:value="setPassword"
                showPassword
                label="Password"
              />
            </slot>
          </SModalChangeEmail>
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
      password: "",
      new_email: "",
      openModal: false,
    };
  },
  methods: {
    setPassword(data) {
      this.password = data;
    },
    setEmail(data) {
      this.new_email = data;
    },
    resetPassword() {
      this.$store.dispatch("auth.reset_password", this.auth.email);
    },
    confirm() {
      const dataUpdate = {
        current_email: this.auth.email,
        new_email: this.new_email,
        password: this.password,
      };
      this.$store.dispatch("auth.change_email", dataUpdate);
    },
  },
  watch: {
    auth() {
      if (!this.auth.email_verified) this.$redirect.toLogin();
    },
  },
};
</script>
