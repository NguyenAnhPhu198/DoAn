<template>
  <CCard>
    <CCardHeader>
      <TMessage :content="$t('User infor')" />
    </CCardHeader>
    <CCardBody>
      <CRow class="m-lg-1">
        <CCol sm="6" class="mb-3">
          <TInputText :value="auth.id" :readonly="true" :label="$t('User id')" />
        </CCol>
        <CCol sm="6" class="mb-3">
          <TInputText  :value="auth.email" :readonly="true" :label="$t('Email')" />
        </CCol>
        <CCol sm="6" class="mb-3">
          <TInputText
            :value="auth.email_verified ? $t('Email verified'): 'Chưa xác thực'"
            :label="$t('Email status')"
            :readonly="true"
          />
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      auth: "auth.me",
    }),
  },
};
</script>
