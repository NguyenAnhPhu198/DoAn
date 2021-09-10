<template>
  <CInput
    :value="value"
    @change="$emit('update:value', $event)"
    class="mb-0"
    :label="getLabel()"
    :placeholder="$t(placeholder)"
    v-bind="inputOptions"
  >
    <template  #append-content>
      <slot> </slot>
    </template>
  </CInput>
</template>

<script>
import mixins from "./mixins";

export default {
  mixins: [mixins],
};
</script>