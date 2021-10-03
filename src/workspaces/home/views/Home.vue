<template>
  <div>
    <CRow class="pb-5">
      <CCol>
        <Banner />
      </CCol>
    </CRow>
    <!-- <CRow class="pb-4">
      <CCol>
        <SearchProducts :filters="filters" @search="searchProducts" />
      </CCol>
    </CRow> -->
    <TMessage content="Suggest for you" size="h4" />
    <div class="v-line mb-4"></div>
    <CRow class="mb-4">
      <CCol>
        <Products store="suggest_products" />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Banner from "./components/Banner.vue";
import Products from "./components/Products.vue";

export default {
  components: {
    Banner,
    Products,
  },
};
</script>
