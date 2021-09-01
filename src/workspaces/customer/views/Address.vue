<template>
  <CRow>
    <CCol col="12" class="mb-4">
      <SButtonAddAddress />
    </CCol>
    <CCol v-for="n in 3" :key="n" col="12" class="mb-3">
      <SCardAddress />
    </CCol>
  </CRow>
</template>

<script>
export default {};
</script>
