<template>
  <div class="btn-add-address">
    <CButton class="w-100 h-100" @click="$emit('click')">
      <TMessage content="New address" alignment="center" color="info">
        <template #prefix>
          <CIcon name="cis-plus" class="mr-1" />
        </template>
      </TMessage>
    </CButton>
  </div>
</template>

<script>
export default {};
</script>
