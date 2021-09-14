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
            savable
            @click-save="showModal"
          />
        </CCol>
        <CCol sm="12" class="mb-3">
          <SModalPasswordConfirmation
            :show.sync="showPWConfirmation"
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
      newEmail: "",
      showPWConfirmation: false,
    };
  },
  methods: {
    setEmail(data) {
      this.newEmail = data;
    },
    showModal() {
      if (this.newEmail !== this.auth.email && this.newEmail !== "")
        this.showPWConfirmation = true;
    },
    changeEmail() {
      this.$store.dispatch("auth.change_email", this.newEmail).then(() => {});
    },
  },
  computed: {
    checkUserStatus() {
      return this.auth.email_verified ? "verified" : "unverified";
    },
  },
};
</script>