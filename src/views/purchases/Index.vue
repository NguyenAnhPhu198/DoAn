<template>
  <CRow>
    <!-- <CSearchBoxSimple
      :fields="searchFields"
      @fieldChanged="searchFieldChanged"
      @valueChanged="searchValueChanged"
    /> -->
    <CCol col="12">
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
            <CBadge :color="getBadge(item.status.id)">{{
              item.status.name
            }}</CBadge>
          </td>
        </template>
        <template #supplier="{ item }">
          <td>
            <CLink :to="'suppliers/' + item.supplier.id">
              {{ item.supplier.name }}
            </CLink>
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
      <CPagination
        align="center"
        :pages="paginate.last"
        :active-page.sync="paginate.current"
        @update:activePage="pageChange"
      />
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Purchases",
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
          sorter: true,
          filter: false,
        },
        { key: "status", _classes: "text-truncate", filter: false },
        { key: "created_at", _classes: "text-truncate", filter: true },
      ],
      searchField: "",
      searchValue: "",
      filter: {},
    };
  },
  created() {
    this.$store.dispatch("order.purchases.fetch");
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.$store.dispatch(
            "order.purchases.change-page",
            Number(route.query.page)
          );
        }
      },
    },
  },
  computed: {
    ...mapGetters({
      paginate: "order.purchases.paginate",
      loading: "order.purchases.loading",
      purchases: "order.purchases.list",
    }),
    searchQuery() {
      if (!this.searchValue) return null;
      if (!this.searchField) return this.searchValue;
      return this.searchField + ":" + this.searchValue;
    },
    searchFields() {
      return [
        { value: "", label: "All" },
        { value: "id", label: "Id" },
        { value: "items.product_id", label: "Product Id" },
        { value: "buyer_id", label: "Buyer" },
        { value: "created_at", label: "Created At" },
      ];
    },
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
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
    searchFieldChanged(field) {
      this.searchField = field.value;
    },
    searchValueChanged(value) {
      this.searchValue = value;
      this.$store.dispatch("order.purchases.push-query", {
        search: this.searchQuery,
      });
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
