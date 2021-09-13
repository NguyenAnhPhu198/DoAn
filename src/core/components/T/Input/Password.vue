<template>
  <CInput
    v-bind="inputOptions"
    :value="value"
    @change="$emit('update:value', $event)"
    :type="toggle ? 'text' : 'password'"
    :placeholder="$t('Enter your password')"
    :label="$t(label)"
  >
    <template #prepend-content><CIcon name="cil-lock-locked" /></template>
    <template #append-content v-if="viewAble">
      <CIcon
        :name="toggle ? 'cisEyeSlash' : 'cisEye'"
        @click.native="toggle = !toggle"
      /> </template
  ></CInput>
</template>

<script>
import mixins from "./mixins";

export default {
  mixins: [mixins],
  data() {
    return {
      toggle: false,
    };
  },
  props: {
    viewAble: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
<style lang="scss" scoped>
.c-icon {
    cursor: pointer
}
</style>
