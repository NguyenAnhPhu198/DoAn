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
        <template #id="{ item }">
          <td>
            <CLink :to="'purchases/' + item.id" class="font-weight-bold">
              {{ item.id }}
            </CLink>
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
            <CLink v-if="item.supplier" :to="'suppliers/' + item.supplier.id">
              {{ item.supplier.name }}
            </CLink>
            <em v-else class="small text-muted"
              >[{{ item.supplier_id }}] - Not found</em
            >
          </td>
        </template>
        <template #buyer_id="{ item }">
          <td>
            <CLink :to="'users/' + item.buyer_id">
              {{ item.buyer_id }}
            </CLink>
          </td>
        </template>
        <template #created_at="{ item }">
          <td class="small">
            {{ item.created_at }}
          </td>
        </template>
        <template #id-filter>
          <CInput @change="setFieldFilter($event, 'id')" class="m-0" />
        </template>
        <template #buyer_id-filter>
          <CInput @change="setFieldFilter($event, 'buyer_id')" class="m-0" />
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
          _classes: "font-weight-bold text-truncate",
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
    setFieldFilter(value, field) {
      if (this.lodash.isEmpty(value)) {
        this.$delete(this.filter, field);
      } else {
        this.$set(this.filter, field, value);
      }
      const searchFieldItems = this.lodash.map(
        this.filter,
        (value, field) => `${field}:${value}`
      );
      const searchFields = this.lodash.join(searchFieldItems, ";");
      this.$store.dispatch("order.purchases.push-query", {
        search: searchFields,
      });
    },
  },
};
</script>
