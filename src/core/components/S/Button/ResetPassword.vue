<template>
  <CLoadingButton
    :color="color"
    :timeout="timeout"
    @click.native="$emit('click')"
  >
    {{ $t(content) }}
  </CLoadingButton>
</template>


<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    timeout: {
      type: Number,
      required: false,
    },
  },
};
</script>
