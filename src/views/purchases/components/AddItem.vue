<template>
  <CModal :show="show" @update:show="$emit('update:show', $event)">
    <template #header>
      <TMessage content="Add item" capitalize />
      <TButtonClose
        variant="outline"
        class="py-0"
        @click="$emit('update:show', false)"
      />
    </template>
    <ProductSelect :id="item.product_id" @update:id="item.product_id = $event">
      <template #append-product-selected="{ product }">
        <TTableAsForm :data="product" :fields="itemFields">
          <template #price="{ value }">
            <TInputNumber :value="value" @input="item.price = $event" />
          </template>
          <template #quantity="{ value }">
            <TInputNumber :value="value" @input="item.quantity = $event" />
          </template>
          <template #tax_percent>
            <TInputNumber
              :value="product.tax ? product.tax.percent : 0"
              :maskOptions="{ integerLimit: 2 }"
              @input="item.tax_percent = $event"
            />
          </template>
          <template #note="{ value }">
            <TInputText :value="value" @update:value="item.note = $event" />
          </template>
        </TTableAsForm>
      </template>
    </ProductSelect>
    <template #footer>
      <TButtonCreate variant="outline" @click="create()" />
    </template>
  </CModal>
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
      this.$tomoni.order.purchase_items
        .create(this.item)
        .then(({ data }) => {
          this.$store.commit("toasts.push", {
            message: "Created",
            type: "success",
          });
          this.$store.commit("order.purchases.detail.items.push", data);
          this.item = this.defaultItem();
          this.$emit("update:show", false);
        })
        .catch(({ response }) => {
          this.$store.dispatch("errors.push-http-error", response);
        });
    },
    defaultItem() {
      return { ...this.$options.defaultItem, purchase_id: this.purchase_id };
    },
  },
};
</script>
