<template>
  <div>
    <TMessage content="Top products" size="h4" />
    <div class="v-line mb-4"></div>
    <CRow class="mb-4">
      <CCol>
        <Products store="tomoni_products" />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Products from "./components/Products.vue";

export default {
  components: {
    Products,
  },
  created() {
    this.$store.dispatch("product.tomoni_products.fetch.if-first-time");
  },
};
</script>
