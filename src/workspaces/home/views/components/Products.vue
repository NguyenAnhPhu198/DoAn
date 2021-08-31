<template>
  <CRow>
    <CCol v-for="n in 30" :key="n" lg="3" md="4" col="6" class="mb-4">
      <SCardProduct />
    </CCol>
  </CRow>
</template>

<script>
export default {};
</script>
