<template>
  <CRow>
    <CCol
      v-for="product of suggest_products"
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
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      suggest_products: "product.suggest_products.list",
    }),
  },
};
</script>
