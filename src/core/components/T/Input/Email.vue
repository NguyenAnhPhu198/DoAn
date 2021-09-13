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
    <template #append-content>
      <TButtonSave @click="$emit('click-save', $event)" v-if="savable" />
    </template>
    <template #prepend-content> </template>
  </TInputText>
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
  },
};
</script>
