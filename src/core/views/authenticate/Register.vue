<template>
  <div
    class="c-app d-flex align-items-center min-vh-100"
    :class="{ 'c-dark-theme': $store.state.sidebar_dark_mode }"
  >
    <CContainer fluid>
      <CRow class="justify-content-center">
        <CCol md="6">
          <CCard class="mx-4 mb-0">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>
                <CInput
                  placeholder="Username"
                  autocomplete="username"
                  :value.sync="user.id"
                >
                  <template #prepend-content
                    ><CIcon name="cil-user"
                  /></template>
                </CInput>
                <CInput
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                  :value.sync="user.email"
                />
                <CInput
                  placeholder="Password"
                  type="password"
                  autocomplete="new-password"
                  :value.sync="user.password"
                >
                  <template #prepend-content
                    ><CIcon name="cil-lock-locked"
                  /></template>
                </CInput>
                <CInput
                  placeholder="Repeat password"
                  type="password"
                  autocomplete="new-password"
                  class="mb-4"
                  :value.sync="user.password_confirmation"
                >
                  <template #prepend-content
                    ><CIcon name="cil-lock-locked"
                  /></template>
                </CInput>
                <CButton color="success" block @click="register"
                  >Create Account</CButton
                >
              </CForm>
            </CCardBody>
            <CCardFooter class="p-4">
              <CRow>
                <CCol col="12">
                  <CButton block color="link" @click="$redirect.toLogin()">
                    Back to login
                  </CButton>
                </CCol>
              </CRow>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      user: {
        id: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
    };
  },
  methods: {
    register() {
      this.$store.dispatch("auth.register", this.user).then(() => {
        this.$redirect.toLogin();
      });
    },
  },
};
</script>
