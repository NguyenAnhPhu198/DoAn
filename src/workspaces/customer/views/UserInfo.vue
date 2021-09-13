<template>
  <CCard>
    <CCardHeader>
      <TMessage content="User info" class="d-inline-flex mr-2" bold />
      <SMessageUserStatus :status="checkUserStatus" />
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
          >
            <template v-slot:append-content>
              <TButtonSave @click="showModal" />
            </template>
          </TInputEmail>
        </CCol>
        <CCol sm="12" class="mb-3">
          <SModalPasswordConfirmation
            :show.sync="openModal"
            @click-confirm="changeEmail"
          >
          </SModalPasswordConfirmation>
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
    showModal() {
      this.password = "";
      if (this.new_email !== this.auth.email && this.new_email !== "")
        this.openModal = true;
    },
    changeEmail(password) {
      const dataUpdate = {
        current_email: this.auth.email,
        new_email: this.new_email,
        password: password,
      };
      this.$store.dispatch("auth.change_email", dataUpdate).then(() => {
        this.openModal = false;
      });
    },
  },
  computed: {
    checkUserStatus() {
      return this.auth.email_verified ? "verified" : "unverified";
    },
  },
};
</script>