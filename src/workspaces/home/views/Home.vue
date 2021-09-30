<template>
  <div>
    <CRow class="pb-5">
      <CCol>
        <Banner />
      </CCol>
    </CRow>
    <CRow class="pb-4">
      <CCol>
        <SearchProducts :filters="filters" @search="searchProducts" />
      </CCol>
    </CRow>
    <CRow class="mb-4">
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
  data() {
    return {
      filters: [
        { value: "name", name: "Name", default: true },
        { value: "id", name: "Jancode" },
      ],
    };
  },
  methods: {
    searchProducts({ filter, key }) {
      this.$store.dispatch("product.suggest_products.push-query", {
        search: `${filter.value}:${key}`,
      });
    },
  },
};
</script>
