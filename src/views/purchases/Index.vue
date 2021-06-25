<template>
  <TTableAdvance
    :items="purchases"
    :fields="fields"
    store="order.purchases"
    @resetFilter="resetFilter"
    resource="purchases"
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
        <TMessageDateTime :content="item.created_at" />
      </td>
    </template>
    <template #id-filter>
      <CInput :value.sync="filter.id" @change="filterChange" class="m-0" />
    </template>
    <template #buyer_id-filter>
      <CInput
        :value.sync="filter.buyer_id"
        @change="filterChange"
        class="m-0"
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
    resetFilter() {
      this.filter = {};
      this.filterChange();
    },
  },
};
</script>
