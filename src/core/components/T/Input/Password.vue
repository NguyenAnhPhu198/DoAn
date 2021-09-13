<template>
  <CInput
    v-bind="inputOptions"
    :value="value"
    @change="$emit('update:value', $event)"
    :type="toggle ? 'text' : 'password'"
    :placeholder="$t('Enter your password')"
    :label="$t(label)"
    addWrapperClasses="append-label"
  >
    <template #prepend-content><CIcon name="cil-lock-locked" /></template>
    <template #append-content v-if="viewable">
      <CButton @click="toggle = !toggle" size="sm" variant="ghost">
        <CIcon :name="toggle ? 'cisEyeSlash' : 'cisEye'" />
      </CButton>
    </template
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
    viewable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>