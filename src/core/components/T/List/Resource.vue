<template>
  <CRow>
    <CCol col="12">
      <slot name="list"></slot>
    </CCol>
    <CCol col="12" class="mt-2">
      <slot name="pagination">
        <TPagination :store="store" />
      </slot>
    </CCol>
  </CRow>
</template>

<script>
import TPagination from "../Pagination.vue";
export default {
  components: {
    TPagination,
  },
  props: {
    store: {
      type: String,
      required: true,
    },
  },
};
</script>
