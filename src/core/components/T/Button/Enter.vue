<template>
  <CLink v-if="!href" :to="`/${resource}/${slug}`">
    <CButton
      color="info"
      :variant="variant"
      :size="size"
      @click="$emit('click')"
      v-c-tooltip="{
        content: 'Enter',
      }"
    >
      <CIcon name="cil-arrow-right" :size="size" />
    </CButton>
  </CLink>
  <CLink v-else :href="href">
    <CButton
      color="info"
      :variant="variant"
      :size="size"
      @click="$emit('click')"
      v-c-tooltip="{
        content: 'Enter',
      }"
    >
      <CIcon name="cil-arrow-right" />
    </CButton>
  </CLink>
</template>

<script>
import mixin from "./mixin";

export default {
  mixins: [mixin],
  props: {
    slug: {
      type: [String, Number],
      required: false,
    },
    href: {
      type: String,
      required: false,
    },
    resource: {
      type: String,
      required: false,
    },
  },
};
</script>