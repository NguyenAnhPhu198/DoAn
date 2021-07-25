<template>
  <TModal
    title="Distribution"
    :show="show"
    size="xl"
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
        <template #order_quantity="{ item }">
          <td>
            <TMessageNumber :value="item.order_item.quantity" />
          </td>
        </template>
        <template #remaining_quantity="{ item }">
          <td>
            <TMessageNumber
              :value="item.order_item.remaining_distributed_quantity"
            />
          </td>
        </template>
        <template #distribution_quantity="{ item }">
          <td>
            <TMessageNumber
              :value="item.quantity"
              editable
              @change="onUpdateQuantity"
            >
              <template #suffix>
                <label
                  class="small text-muted"
                  v-if="purchaseItem.remaining_distributed_quantity > 0"
                  v-c-tooltip="{
                    content: 'Remaining distributable',
                  }"
                >
                  (+{{ purchaseItem.remaining_distributed_quantity }})</label
                >
              </template>
            </TMessageNumber>
          </td>
        </template>
        <template #supply_sale_price="{ item }">
          <td>
            <TMessageMoney
              :amount="item.price"
              editable
              @change="onUpdatePrice"
            />
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
          key: "distributed_quantity",
          label: "Distributed quantity",
        },
        {
          key: "remaining_distributed_quantity",
          label: "Remaining quantity",
        },
        { key: "distribution_quantity", label: "Distribution quantity" },
        { key: "supply_sale_price", label: "Supply sale price" },
        { key: "_", label: "#" },
      ],
      distributionFields: [
        { key: "_", label: "#" },
        { key: "order_id", label: "Order" },
        { key: "order_quantity", label: "Order quantity" },
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
      purchaseItem: "order.purchase_items.detail",
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
          criteria: "OrderItemsForDistribution",
          search: `product_id:${this.purchaseItem.product_id}`,
          with: "distributes",
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
        search: `purchase_product_id:${this.purchaseItem.id}`,
      });
    },
    addDistribution(orderItem) {
      this.$store
        .dispatch("order.distributions.create", {
          order_product_id: orderItem.id,
          purchase_product_id: this.purchaseItem.id,
          quantity: orderItem.distribution_quantity,
          price: orderItem.supply_sale_price,
        })
        .then(() => {
          this.fetchOrderItems();
        });
    },
    onUpdateQuantity(value) {
      this.$store
        .dispatch("order.distributions.detail.update", {
          quantity: value,
        })
        .then(() => {
          this.fetchOrderItems();
        });
    },
    onUpdatePrice(value) {
      this.$store
        .dispatch("order.distributions.detail.update", {
          price: value,
        })
        .then(() => {
          this.fetchOrderItems();
        });
    },
  },
};
</script>
