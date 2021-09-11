<template>
  <CInput
    :value="value"
    @change="$emit('update:value', $event)"
    class="mb-0"
    :label="getLabel()"
    :placeholder="$t(placeholder)"
    v-bind="inputOptions"
  >
    <template #prepend-content>
      <slot name="prepend-content"> </slot>
    </template>
    <template #append-content>
      <slot name="append-content"> </slot>
    </template>
  </CInput>
</template>

<script>
import mixins from "./mixins";

export default {
  mixins: [mixins],
};
</script>