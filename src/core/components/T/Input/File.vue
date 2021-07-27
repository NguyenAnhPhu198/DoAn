<template>
  <CInputFile
    v-bind="inputOptions"
    @change="$emit('change', $event)"
    class="mb-0"
  />
</template>

<script>
export default {
  props: {
    inputOptions: {
      type: Object,
      required: false,
    },
  },
};
</script>