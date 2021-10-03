<template>
  <CRow>
    <CCol
      v-for="product of products"
      :key="product.id"
      lg="3"
      md="4"
      col="6"
      xxl="2"
      class="mb-2"
    >
      <SCardProduct :product="product" />
    </CCol>
  </CRow>
</template>

<script>
export default {
  props: {
    store: {
      type: String,
      required: true,
    },
  },
  computed: {
    products() {
      return this.$store.getters[`product.${this.store}.list`];
    },
  },
};
</script>
