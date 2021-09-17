<template>
  <CInput
    type="email"
    autocomplete="email"
    class="mb-0"
    :value="input"
    :label="getLabel()"
    :placeholder="$t(placeholder)"
    v-bind="inputOptions"
    @change="setInput"
  >
    <template #prepend-content><CIcon name="cil-envelope-closed" /></template>
    <template #append>
      <TButtonSave
        @click="$emit('click-save', input)"
        v-if="savable"
        variant="outline"
      />
    </template>
  </CInput>
</template>

<script>
import mixins from "./mixins";
export default {
  mixins: [mixins],
  props: {
    savable: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: "Enter email",
    },
  },
};
</script>
