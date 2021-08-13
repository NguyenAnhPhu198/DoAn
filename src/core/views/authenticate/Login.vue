<template>
  <div
    class="c-app flex-row align-items-center"
    :class="{ 'c-dark-theme': $store.state.sidebar_dark_mode }"
  >
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="5">
          <CCard class="mx-4 mb-0">
            <CCardBody>
              <CForm>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <CInput
                  placeholder="Email"
                  autocomplete="email"
                  prepend="@"
                  :value.sync="email"
                />
                <CInput
                  placeholder="Password"
                  type="password"
                  :value.sync="password"
                  autocomplete="curent-password"
                >
                  <template #prepend-content
                    ><CIcon name="cil-lock-locked"
                  /></template>
                </CInput>
                <CRow>
                  <CCol col="6" class="text-left">
                    <CButton color="primary" class="px-4" @click="loginPW"
                      >Login</CButton
                    >
                  </CCol>
                  <CCol col="6" class="text-right">
                    <CButton color="link" class="px-0" @click="$redirect.toForgotPassword()"
                      >Forgot password?</CButton
                    >
                  </CCol>
                </CRow>
              </CForm>
              <CRow>
                <CCol class="text-center">
                  <hr />
                  <CButton color="facebook" @click="loginSocial('facebook')">
                    <CIcon name="cib-facebook" />
                  </CButton>
                  <CButton
                    class="ml-2"
                    color="youtube"
                    @click="loginSocial('google')"
                  >
                    <CIcon name="cib-google" />
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "root@abc.xyz",
      password: "password",
    };
  },
  methods: {
    loginPW() {
      this.$store
        .dispatch("auth.login.password", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$redirect.toHome();
        });
    },
    loginSocial(provider) {
      this.$store.dispatch("auth.login.social", provider).then(() => {
        this.$redirect.toHome();
      });
    },
  },
};
</script>
