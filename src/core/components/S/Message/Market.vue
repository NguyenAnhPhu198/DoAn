<template>
  <CHeaderNavLink :to="to" exact class="h-100 market-item mx-2">
    <CIcon :src="getSrcIcon()" :height="height" />
    <TMessage :content="name" noTranslate noWrap uppercase class="ml-2" />
  </CHeaderNavLink>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      default: 20,
    },
  },
  methods: {
    getSrcIcon() {
      return `${process.env.VUE_APP_ASSETS_URL}/${this.icon}.png`;
    },
  },
};
</script>
