<template>
  <div>
    <CInput
      :label="label"
      :value="value"
      v-bind="inputOptions"
      @change="$emit('update:value', $event)"
      class="mb-0"
      :readonly="readonly"
    />
  </div>
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
    label: {
      type: String,
      required: false,
    },
    readonly:{
      type: Boolean,
      required: false,
    }
  },
};
</script>