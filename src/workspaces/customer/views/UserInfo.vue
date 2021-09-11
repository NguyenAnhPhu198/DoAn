<template>
  <CCard>
    <CCardHeader>
      <TMessage content="User info" class="d-inline-flex mr-2" bold />
      <SMessageUserStatus :status="auth.email_verified" />
      <div class="float-right">
        <SButtonEmailVerify
          v-if="!auth.email_verified"
          @click="sendEmailVerify"
        />
        <SButtonResetPassword class="ml-2" @click="resetPassword" />
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
          >
            <slot slot="append-content">
              <TButtonSave @click="showModal" />
            </slot>
          </TInputEmail>
        </CCol>
        <CCol sm="12" class="mb-3">
          <SModalConfirm
            title="Confirm password"
            :show.sync="openModal"
            @click-confirm="changeEmail"
          >
            <slot>
              <TInputPassword
                :value="password"
                show
                label="Password"
                :inputOptions="{
                  addLabelClasses: 'font-weight-bold',
                }"
                @update:value="setPassword"
              />
            </slot>
          </SModalConfirm>
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
    setEmail(data) {
      this.new_email = data;
    },
    setPassword(data) {
      this.password = data;
    },
    showModal() {
      this.password = "";
      if (this.new_email !== this.auth.email && this.new_email !== "")
        this.openModal = true;
    },
    resetPassword() {
      this.$store.dispatch("auth.reset_password", this.auth.email);
    },
    sendEmailVerify() {
      this.$store.dispatch("auth.send_email_verify");
    },
    changeEmail() {
      const dataUpdate = {
        current_email: this.auth.email,
        new_email: this.new_email,
        password: this.password,
      };
      this.$store.dispatch("auth.change_email", dataUpdate);
    },
  },
};
</script>