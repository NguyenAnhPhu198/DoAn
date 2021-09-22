<template>
  <CRow>
    <CCol col="12" class="mb-4">
      <SButtonAddAddress />
    </CCol>
    <CCol v-for="address in list" :key="address.id" col="12">
      <SCardAddress :address="address" :loading="loading" />
    </CCol>
    <CCol v-show="paginate.last > 1" col="12" class="mt-2">
      <slot name="pagination">
        <TPagination store="auth.shipment_infos" />
      </slot>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      list: "auth.shipment_infos.list",
      loading: "auth.shipment_infos.fetching",
      paginate: "auth.shipment_infos.paginate",
    }),
  },
};
</script>
