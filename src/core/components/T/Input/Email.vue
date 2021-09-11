<template>
  <TInputText
    :inputOptions="{
      ...inputOptions,
      type: 'email',
      prepend: '@',
      autocomplete: 'email',
    }"
    :value="value"
    @update:value="$emit('update:value', $event)"
    placeholder="Enter your email"
    :label="label"
  >
    <slot name="append-content" slot="append-content"> </slot>
    <slot name="prepend-content" slot="prepend-content"> </slot>
  </TInputText>
</template>

<script>
import mixins from "./mixins";
export default {
  mixins: [mixins],
};
</script>
