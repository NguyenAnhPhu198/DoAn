<template>
  <div
    class="c-app flex-row align-items-center"
    :class="{ 'c-dark-theme': $store.state.sidebar_dark_mode }"
  >
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    :value.sync="username"
                    autocomplete="username email"
                  >
                    <template #prepend-content
                      ><CIcon name="cil-user"
                    /></template>
                  </CInput>
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
                      <CButton color="link" class="px-0"
                        >Forgot password?</CButton
                      >
                      <CButton
                        color="link"
                        class="d-lg-none"
                        @click="$redirect.toRegister()"
                        >Register now!</CButton
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
                    <CButton class="ml-2" color="youtube" @click="loginSocial('google')">
                      <CIcon name="cib-google" />
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            <CCard
              color="primary"
              text-color="white"
              class="text-center py-5 d-md-down-none"
              body-wrapper
            >
              <CCardBody>
                <h2>Sign up</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <CButton
                  color="light"
                  variant="outline"
                  size="lg"
                  @click="$redirect.toRegister()"
                >
                  Register Now!
                </CButton>
              </CCardBody>
            </CCard>
          </CCardGroup>
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
      username: "root@abc.xyz",
      password: "password",
    };
  },
  methods: {
    loginPW() {
      this.$store.dispatch("auth.login.password", {
        email: this.username,
        password: this.password,
      }).then(() => {
        this.$redirect.toHome();
      })
    },
    loginSocial(provider) {
      this.$store.dispatch("auth.login.social", provider).then(() => {
        this.$redirect.toHome();
      })
    },
  },
};
</script>
