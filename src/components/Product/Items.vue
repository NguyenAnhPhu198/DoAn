<template>
  <div v-if="this.items.length">
    <CMedia style="height: 70px; min-width: 400px">
      <template #aside>
        <CImg
          :src="product.image"
          thumbnail
          width="70px"
          height="70px"
          style="min-width: 70px; max-height: 70px"
        />
      </template>
      <CCol col="12">
        <CRow>
          <TLink
            :id="product.id"
            resource="products"
            :content="product.name"
            :messageOptions="{ truncate: 2 }"
          />
        </CRow>
        <CRow v-if="product.id">
          <TMessage :content="product.id" size="small" :truncate="1" />
        </CRow>
        <CRow v-if="other">
          <TMessage
            content="other items"
            size="small"
            color="muted"
            :truncate="1"
          >
            <template #prefix> +{{ other }} </template>
          </TMessage>
        </CRow>
      </CCol>
    </CMedia>
    <slot name="append" :product="product"></slot>
  </div>
  <TMessageNotFound v-else slug="" style="height: 70px; min-width: 400px" />
</template>

<script>
import lodash from "@/core/plugins/lodash";

export default {
  props: {
    items: {
      type: Array,
      required: true,
      validator: function (items) {
        return lodash.hasKeyObjects(items, "product_id");
      },
    },
  },
  data() {
    return {
      product: {
        id: "",
        name: "",
        image: "",
        price: 0,
        quantity: 1,
      },
      other: 0,
    };
  },
  created() {
    this.applyItems(this.items);
  },
  watch: {
    items(items) {
      this.applyItems(items);
    },
  },
  methods: {
    applyItems(items) {
      if (!items.length) {
        return;
      }

      this.product.id = items[0].product_id;
      this.other = items.length - 1;

      // nếu đã có thông tin product
      if (items[0].product) {
        this.product = items[0].product;
        this.product.image = items[0].product.images
          ? items[0].product.images.url
          : null;
      } else {
        // nếu chưa có thông tin product
        this.$tomoni.product.products
          .get(this.product.id, { with: "tax" })
          .then(({ data }) => {
            this.product = data;
            this.product.image = data.images ? data.images.url : null;
          });
      }
    },
  },
};
</script>