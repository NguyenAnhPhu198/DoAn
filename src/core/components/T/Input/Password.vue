<template>
  <CInput
    v-bind="inputOptions"
    :value="value"
    @change="$emit('update:value', $event)"
    :type="showPassword ? 'text' : 'password'"
    :placeholder="$t('Enter your password')"
    :label="$t(label)"
  >
    <template #append>
      <CIcon
        class="eyeIcon"
        :name="showPassword ? 'cisEyeSlash' : 'cisEye'"
        @click.native="showPassword = !showPassword"
      /> </template
     ></CInput>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
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
    }
  },
};
</script>
<style lang="scss" scoped>
.c-icon {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 999;
}
</style>