<template>
  <CRow>
    <CCol col="12" class="mb-4">
      <SButtonAddAddress @click="showCreate" />
    </CCol>
    <CCol v-for="address in list" :key="address.id" col="12">
      <SCardAddress :address="address" :loading="loading" />
    </CCol>
    <CCol v-show="paginate.last > 1" col="12" class="mt-2">
      <slot name="pagination">
        <TPagination store="auth.addresses" />
      </slot>
    </CCol>
    <SModalAddress
      :show.sync="showModalAddress"
      @created="showModalAddress = false"
    />
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      showModalAddress: false,
    };
  },
  computed: {
    ...mapGetters({
      list: "auth.addresses.list",
      loading: "auth.addresses.fetching",
      paginate: "auth.addresses.paginate",
    }),
  },
  methods: {
    showCreate() {
      this.showModalAddress = true;
    },
  },
};
</script>
