<template>
  <div>
    <CRow class="pb-5">
      <CCol>
        <Banner />
      </CCol>
    </CRow>
    <CRow class="pb-4">
      <CCol>
        <SearchProducts />
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <Products />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import Banner from "./components/Banner.vue";
import Products from "./components/Products.vue";
import SearchProducts from "./components/SearchProducts.vue";

export default {
  components: {
    Banner,
    Products,
    SearchProducts,
  },
};
</script>
