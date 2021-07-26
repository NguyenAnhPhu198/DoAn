<template>
  <TTableAdvance
    :items="purchases"
    :fields="fields"
    store="order.purchases"
    @click-clear-filter="clearFilter"
    resource="purchases"
    enterable
    creatable
  >
    <template #items="{ item }">
      <td>
        <ProductItems :items="item.items" />
      </td>
    </template>
    <template #status="{ item }">
      <td>
        <TMessageStatus :id="item.status.id" />
      </td>
    </template>
    <template #supplier="{ item }">
      <td class="text-truncate">
        <TLink
          v-if="item.supplier"
          :id="item.supplier.id"
          resource="suppliers"
          :content="item.supplier.name"
        />
        <TMessageNotFound v-else :slug="item.supplier_id" />
      </td>
    </template>
    <template #buyer_id="{ item }">
      <td>
        <TLink :id="item.buyer_id" resource="users" :content="item.buyer_id" />
      </td>
    </template>
    <template #balance="{ item }">
      <td>
        <TMessageMoney :amount="item.balance" />
      </td>
    </template>
    <template #created_at="{ item }">
      <td>
        <TMessageDateTime :content="item.created_at" small />
      </td>
    </template>
    <template #id-filter>
      <CInput :value.sync="filter.id" @change="filterChange" class="m-0" />
    </template>
    <template #items-filter>
      <CInput
        :value.sync="filter['items.product_id']"
        @change="filterChange"
        class="m-0"
        placeholder="jancode"
      />
    </template>
    <template #buyer_id-filter>
      <CInput
        :value.sync="filter.buyer_id"
        @change="filterChange"
        class="m-0"
      />
    </template>
    <template #status-filter>
      <OrderSelectStatus
        :value.sync="filter['director.status.id']"
        @change="filterChange"
      />
    </template>
  </TTableAdvance>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fields: [
        { key: "_", label: "#" },
        { key: "id" },
        { key: "items", label: "Items" },
        { key: "supplier" },
        { key: "buyer_id", label: "Buyer" },
        { key: "balance" },
        { key: "status" },
        { key: "created_at" },
      ],
      filter: {},
    };
  },
  computed: {
    ...mapGetters({
      purchases: "order.purchases.list",
    }),
  },
  methods: {
    filterChange() {
      const searchFieldItems = this.lodash.map(this.filter, (value, field) => {
        return this.lodash.isEmpty(value) ? null : `${field}:${value}`;
      });
      const searchFieldItemsFiled = this.lodash.filter(searchFieldItems);
      const searchFields = this.lodash.join(searchFieldItemsFiled, ";");
      this.$store.dispatch("order.purchases.push-query", {
        search: searchFields,
      });
    },
    clearFilter() {
      this.filter = {
        ["director.status.id"]: "",
      };
      this.filterChange();
    },
  },
};
</script>
