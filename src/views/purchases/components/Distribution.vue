<template>
  <TModal
    title="Distribution"
    :show="show"
    size="lg"
    @update:show="$emit('update:show', $event)"
    @click-create="create()"
  >
    <CCol col="12">
      <TTableAdvance
        :items="orderItems"
        :fields="remainingOrderFields"
        store="order.distributions"
        resource="distributions"
        title="Remaining orders:"
        noFilter
        noPaginate
        addable
        @click-add="addDistribution"
      >
        <!-- - paginate -->
        <template #supply_sale_price="{ item }">
          <td>
            <TInputMoney :value.sync="item.supply_sale_price" />
          </td>
        </template>
        <template #distribution_quantity="{ item }">
          <td>
            <TInputNumber :value.sync="item.distribution_quantity" />
          </td>
        </template>
      </TTableAdvance>
    </CCol>
    <CCol col="12" class="mt-3">
      <TTableAdvance
        :items="distributions"
        :fields="distributionFields"
        store="order.distributions"
        resource="distributions"
        title="Distributed orders:"
        noFilter
        noPaginate
        removable
        @click-add="addDistribution"
      >
        <!-- - paginate -->
        <template #order_id="{ item }">
          <td>
            {{ item.order_item.order_id }}
          </td>
        </template>
        <template #remaining_quantity="{ item }">
          <td>
            <TMessageNumber
              :value="
                item.order_item.quantity_available_in_order_product_purchase
              "
            />
          </td>
        </template>
        <template #distribution_quantity="{ item }">
          <td>
            <TMessageNumber :value="item.quantity" />
          </td>
        </template>
        <template #supply_sale_price="{ item }">
          <td>
            <TMessageMoney :amount="item.price" />
          </td>
        </template>
      </TTableAdvance>
    </CCol>
    <template #actions><div></div></template>
  </TModal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      remainingOrderFields: [
        { key: "order_id", label: "Order" },
        { key: "quantity", label: "Order quantity" },
        {
          key: "quantity_in_order_product_purchase",
          label: "Distributed quantity",
        },
        {
          key: "quantity_available_in_order_product_purchase",
          label: "Remaining quantity",
        },
        { key: "distribution_quantity", label: "Distribution quantity" },
        { key: "supply_sale_price", label: "Supply sale price" },
        { key: "_", label: "#" },
      ],
      distributionFields: [
        { key: "_", label: "#" },
        { key: "order_id", label: "Order" },
        { key: "quantity", label: "Order quantity" },
        {
          key: "remaining_quantity",
          label: "Remaining quantity",
        },
        {
          key: "distribution_quantity",
          label: "Distribution quantity",
        },
        { key: "supply_sale_price", label: "Supply sale price" },
      ],
      orderItems: [],
    };
  },
  computed: {
    ...mapGetters({
      item: "order.purchases.detail.items.selected",
      distributions: "order.distributions.list",
    }),
  },
  watch: {
    show(show) {
      if (show) {
        this.fetchOrderItems();
        this.fetchDistributions();
      }
    },
  },
  methods: {
    fetchOrderItems() {
      this.$tomoni.order.order_items
        .all({
          criteria: "OrderProductAvailableForPurchase",
          search: `product_id:${this.item.product_id}`,
          with: "orderItemPurchases",
        })
        .then(({ data }) => {
          // - paginate
          this.orderItems = data.data;
        })
        .catch(({ response }) => {
          this.$store.dispatch("errors.push-http-error", response);
        });
    },
    fetchDistributions() {
      this.$store.dispatch("order.distributions.push-query", {
        search: `purchase_product_id:${this.item.id}`,
      });
    },
    addDistribution(orderItem) {
      console.log(orderItem);
      this.$tomoni.order.distributions
        .create({
          order_product_id: orderItem.id,
          purchase_product_id: this.item.id,
          quantity: orderItem.supply_sale_price,
          price: orderItem.distribution_quantity,
        })
        .then(() => {
          this.fetchOrderItems();
          this.fetchDistributions();
        })
        .catch(({ response }) => {
          this.$store.dispatch("errors.push-http-error", response);
        });
    },
  },
};
</script>
