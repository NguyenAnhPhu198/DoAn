<template>
  <TModal
    title="Add item"
    :show="show"
    @update:show="$emit('update:show', $event)"
    @click-create="create()"
  >
    <ProductSelect :id="item.product_id" @update:id="item.product_id = $event">
      <template #append-product-selected="{ product }">
        <TTableAsForm :data="product" :fields="itemFields">
          <template #price="{ value }">
            <TInputNumber :value="value" @update:value="item.price = $event" />
          </template>
          <template #quantity="{ value }">
            <TInputNumber
              :value="value"
              @update:value="item.quantity = $event"
            />
          </template>
          <template #tax_percent>
            <TInputNumber
              :value="product.tax ? product.tax.percent : 0"
              :maskOptions="{ integerLimit: 2 }"
              @update:value="item.tax_percent = $event"
            />
          </template>
          <template #note="{ value }">
            <TInputText :value="value" @update:value="item.note = $event" />
          </template>
        </TTableAsForm>
      </template>
    </ProductSelect>
  </TModal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    purchase_id: {
      type: String,
      required: true,
    },
  },
  defaultItem: {
    purchase_id: null,
    product_id: null,
    price: 0,
    quantity: 0,
    tax_percent: 0,
    note: null,
  },
  data() {
    return {
      item: this.defaultItem(),
      itemFields: [
        { key: "price" },
        { key: "quantity" },
        { key: "tax_percent", label: "Tax percent" },
        { key: "note" },
      ],
    };
  },
  methods: {
    create() {
      this.$store
        .dispatch("order.purchase_items.create", this.item)
        .then(() => {
          this.item = this.defaultItem();
          this.$emit("update:show", false);
        });
    },
    defaultItem() {
      return { ...this.$options.defaultItem, purchase_id: this.purchase_id };
    },
  },
};
</script>
