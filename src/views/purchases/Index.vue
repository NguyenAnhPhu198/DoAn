<template>
  <TListResource store="order.purchases">
    <template #list>
      <CDataTable
        border
        :items="purchases"
        :fields="fields"
        :itemsPerPage="paginate.per"
        :loading="loading"
        column-filter
      >
        <template #_="{ item }">
          <td>
            <TListAction
              :actions="['detail']"
              resource="purchases"
              :slug="item.id"
              store="order.purchases"
            />
          </td>
        </template>
        <template #items="{ item }">
          <td style="height: 90px; min-width: 400px">
            <div v-if="item.items">
              <ProductItems :items="item.items" />
            </div>
          </td>
        </template>
        <template #status="{ item }">
          <td>
            <CBadge v-if="item.status" :color="getBadge(item.status.id)">{{
              item.status.name
            }}</CBadge>
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
            <CMessageNotFound v-else :slug="item.supplier_id" />
          </td>
        </template>
        <template #buyer_id="{ item }">
          <td>
            <TLink
              :id="item.buyer_id"
              resource="users"
              :content="item.buyer_id"
            />
          </td>
        </template>
        <template #balance="{ item }">
          <td>
            <CMessageMoney :amount="item.balance" />
          </td>
        </template>
        <template #created_at="{ item }">
          <td>
            <CMessageDateTime :content="item.created_at" />
          </td>
        </template>
        <template #_-filter>
          <CButton
            color="info"
            variant="ghost"
            size="sm"
            @click="clearFilter"
            v-c-tooltip="{
              content: 'Clear filter',
              appendToBody: true,
            }"
          >
            <CIcon name="cil-clear-all" />
          </CButton>
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
      </CDataTable>
    </template>
  </TListResource>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fields: [
        { key: "_", label: "#", filter: true },
        { key: "id", _classes: "text-truncate", filter: true },
        {
          key: "items",
          label: "Items",
          _classes: "text-truncate",
          filter: false,
        },
        { key: "supplier", _classes: "text-truncate", filter: false },
        {
          key: "buyer_id",
          label: "Buyer",
          _classes: "text-truncate",
          filter: true,
        },
        {
          key: "balance",
          _classes: "text-truncate",
          filter: false,
        },
        { key: "status", _classes: "text-truncate", filter: false },
        { key: "created_at", _classes: "text-truncate", filter: false },
      ],
      filter: {},
    };
  },
  computed: {
    ...mapGetters({
      paginate: "order.purchases.paginate",
      loading: "order.purchases.loading",
      purchases: "order.purchases.list",
    }),
  },
  methods: {
    getBadge(status) {
      switch (status) {
        case "Newish":
          return "secondary";
        case "Finish":
          return "success";
        case "Cancelled":
          return "danger";
        default:
          return "warning";
      }
    },
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
      this.filter = {};
      this.filterChange();
    },
  },
};
</script>
