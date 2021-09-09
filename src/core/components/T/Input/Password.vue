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
export default {
  data() {
    return {
      show: false,
    };
  },
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
    showPassword: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
