<template>
  <CInput
    :value="value"
    v-bind="inputOptions"
    @change="$emit('update:value', $event)"
    class="mb-0"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      required: false,
    },
    inputOptions: {
      type: Object,
      required: false,
    },
  },
};
</script>