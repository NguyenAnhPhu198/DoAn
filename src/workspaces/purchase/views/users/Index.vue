<template>
  <TTableAdvance
    :items="users"
    :fields="fields"
    store="auth.users"
    @click-clear-filter="clearFilter"
    @update:sorter-value="setSorter"
    resource="purchase/users"
    enterable
    creatable
  >
    <template #role_id="{ item }">
      <td>
        <SAuthMessageRole :id="item.role_id" />
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
    <template #email-filter>
      <CInput :value.sync="filter.email" @change="filterChange" class="m-0" />
    </template>
    <template #role_id-filter>
      <SAuthSelectRole :value.sync="filter.role_id" @change="filterChange" />
    </template>
    <template #created_at-filter>
      <TInputDateTimeRange
        :value.sync="dateRange"
        @update:value="setCreatedAtFilter"
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
        { key: "email" },
        { key: "role_id", label: "Role" },
        { key: "created_at", label: "Created At" },
      ],
      filter: {},
      dateRange: {
        start: null,
        end: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      users: "auth.users.list",
    }),
  },
  methods: {
    filterChange() {
      const searchFieldItems = this.lodash.map(this.filter, (value, field) => {
        return this.lodash.isEmpty(value) ? null : `${field}:${value}`;
      });
      const searchFieldItemsFiled = this.lodash.filter(searchFieldItems);
      const searchFields = this.lodash.join(searchFieldItemsFiled, ";");
      this.$store.dispatch("auth.users.push-query", {
        search: searchFields,
      });
    },
    setCreatedAtFilter({ start, end }) {
      this.filter.created_at = `${start},${end}`;
      this.filterChange();
    },
    clearFilter() {
      this.filter = {};
      this.dateRange = {
        start: null,
        end: null,
      };
      this.filterChange();
    },
    setSorter(sorter) {
      this.$store.dispatch("auth.users.push-query", {
        orderBy: sorter.column,
        sortedBy: sorter.asc ? "asc" : "desc",
      });
    },
  },
};
</script>
