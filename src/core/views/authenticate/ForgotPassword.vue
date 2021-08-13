<template>
  <div
    class="c-app d-flex align-items-center min-vh-100"
    :class="{ 'c-dark-theme': $store.state.sidebar_dark_mode }"
  >
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="5">
          <CCard class="mx-4 mb-0">
            <CCardBody>
              <CForm>
                <h1>Forgot Password</h1>
                <p class="text-muted">Reset your password</p>
                <CInput
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                  :value.sync="email"
                />
                <CButton color="success" block @click="resetPW"
                  >Get an email to reset my password</CButton
                >
              </CForm>
            </CCardBody>
            <CCardFooter>
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
  data() {
    return {
      email: null,
    };
  },
  methods: {
    resetPW() {
      this.$store.dispatch("auth.reset_password", this.email).then(() => {
        this.$redirect.toLogin();
      });
    },
  },
};
</script>
