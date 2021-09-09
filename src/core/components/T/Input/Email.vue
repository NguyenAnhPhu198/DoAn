<template>
  <CInput
    v-bind="inputOptions"
    :value="value"
    @change="$emit('update:value', $event)"
    type="email"
    :placeholder="$t('Enter your email')"
    :label="$t(label)"
    prepend="@"
    autocomplete="email"
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
    label: {
      type: String,
      required: false,
    },
  },
};
</script>