<template>
  <div class="product">
    <CWidgetBrand class="w-100">
      <CImg
        class="product-image"
        :src="getImageUrl()"
        fluid
        block
        align="center"
      />
      <template #body>
        <div class="p-2">
          <TMessage :content="product.name" :truncate="2" noTranslate />
          <TMessage
            :content="product.id"
            size="small"
            italic
            :truncate="1"
            class="my-1"
            noTranslate
          />
          <TMessageMoney :amount="product.price" />
        </div>
        <CCardFooter class="px-2 py-2 mt-auto">
          <CLink
            class="
              font-weight-bold font-xs
              text-muted
              d-flex
              justify-content-between
            "
            :to="'/products/' + product.id"
          >
            {{ $t("View detail") }}
            <CIcon name="cil-arrow-right" width="16" />
          </CLink>
        </CCardFooter>
      </template>
    </CWidgetBrand>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImageUrl() {
      return this.product.images ? this.product.images.url : null;
    },
  },
};
</script>

<style scoped>
.product {
  height: 100%;
  width: 100%;
  display: flex;
}

.product .product-image {
  height: 30vh;
  object-fit: cover;
}
</style>
