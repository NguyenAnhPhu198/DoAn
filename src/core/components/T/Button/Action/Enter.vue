<template>
  <CLink v-if="!href" :to="`${resource}/${slug}`">
    <CButton
      color="info"
      variant="ghost"
      :size="size"
      class="py-0"
      @click="$emit('click')"
      v-c-tooltip="{
        content: 'Open',
      }"
      shape="pill"
    >
      <CIcon name="cil-arrow-right" size="sm" />
    </CButton>
  </CLink>
  <CLink v-else :href="href">
    <CButton
      color="info"
      variant="ghost"
      :size="size"
      class="py-0"
      @click="$emit('click')"
      v-c-tooltip="{
        content: 'Open',
      }"
      shape="pill"
    >
      <CIcon name="cil-arrow-right" size="sm" />
    </CButton>
  </CLink>
</template>

<script>
export default {
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
    size: {
      type: String,
      required: false,
      default: "sm",
    },
  },
};
</script>