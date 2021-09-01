<template>
  <CDropdownItem class="d-block">
    <div style="height: 30px" class="small mb-1">Order: {{ id }}</div>
  </CDropdownItem>
</template>

<script>
export default {
  props: {
    id: {
      required: false,
    },
  },
};
</script>
