<template>
  <div>
    <CRow class="pb-4">
      <CCol>
        <SearchOrders />
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <Orders />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import SearchOrders from "./components/SearchOrders.vue";
import Orders from "./components/Orders.vue";
export default {
  components: {
    SearchOrders,
    Orders,
  },
};
</script>
