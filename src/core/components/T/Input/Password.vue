<template>
  <CInput
    v-bind="inputOptions"
    :value="value"
    @change="$emit('update:value', $event)"
    :type="show ? 'text' : 'password'"
    :placeholder="$t('Enter your password')"
    :label="$t(label)"
  >
    <template #prepend-content><CIcon name="cil-lock-locked" /></template>
    <template #append-content v-if="showPassword">
      <CIcon
        :name="show ? 'cisEyeSlash' : 'cisEye'"
        @click.native="show = !show"
      /> </template
  ></CInput>
</template>

<script>
import mixins from "./mixins";

export default {
  mixins: [mixins],
  data() {
    return {
      show: false,
    };
  },
  props: {
    showPassword: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
