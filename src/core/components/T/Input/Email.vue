<template>
  <TInputText
    :inputOptions="{
      ...inputOptions,
      type: 'email',
      prepend: '@',
      autocomplete: 'email',
    }"
    :value="value"
    @update:value="$emit('update', $event)"
    placeholder="Enter your email"
    :label="label"
  >
    <slot> </slot>
  </TInputText>
</template>

<script>
import mixins from "./mixins";
export default {
  mixins: [mixins],
};
</script>
