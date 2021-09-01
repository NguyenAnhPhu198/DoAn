<template>
  <CRow>
    <CCol v-for="n in 3" :key="n" col="12" class="mb-3">
      <SCardCart />
    </CCol>
    <CCol col="12" class="mt-2 mb-4">
      <SButtonCheckoutCart />
    </CCol>
  </CRow>
</template>

<script>
export default {};
</script>
