<template>
  <CRow>
    <CSearchBoxSimple
      :fields="searchFields"
      @fieldChanged="searchFieldChanged"
      @valueChanged="searchValueChanged"
    />
    <CCol col="12">
      <CDataTable
        hover
        striped
        :items="users"
        :fields="fields"
        :itemsPerPage="paginate.per"
        :loading="loading"
        clickable-rows
        @row-clicked="rowClicked"
      >
        <template #status="{ item }">
          <td>
            <CBadge :color="getBadge(item.status.id)">{{
              item.status.name
            }}</CBadge>
          </td>
        </template>
        <template #role="{ item }">
          <td>
            <CBadge color="light" class="mr-1">{{ item.role.name }}</CBadge>
          </td>
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
  name: "Users",
  data() {
    return {
      fields: [
        { key: "id", label: "Username", _classes: "font-weight-bold" },
        { key: "email" },
        { key: "email_verified_at", label: "Verified" },
        { key: "role" },
        { key: "status" },
      ],
      searchField: "",
      searchValue: "",
    };
  },
  created() {
    this.$store.dispatch('auth.users.fetch');
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.$store.dispatch('auth.users.change-page', Number(route.query.page));
        }
      },
    },
  },
  computed: {
    ...mapGetters({
      paginate: 'auth.users.paginate',
      loading: 'auth.users.loading',
      users: 'auth.users.list',
    }),
    searchQuery() {
      if (!this.searchValue) return null;
      if (!this.searchField) return this.searchValue;
      return this.searchField + ":" + this.searchValue;
    },
    searchFields() {
      return [
        { value: "", label: "All" },
        { value: "id", label: "Username" },
        { value: "email", label: "Email" },
        {
          value: "role.name",
          label: "Role",
          onlyValues: this.$store.getters['auth.roles.list'].map((r) => r.name),
        },
        {
          value: "status.name",
          label: "Status",
          onlyValues: this.$store.getters['auth.user_statuses.list'].map((s) => s.name),
        },
      ];
    },
  },
  methods: {
    getBadge(status) {
      switch (status) {
      case "alive":
        return "success";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "warning";
      case "locked":
        return "danger";
      default:
        "primary";
      }
    },
    rowClicked(item) {
      this.$store.commit('toasts.push', {
        message: `Entered to id: ${item.id}`,
      });
    },
    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },
    searchFieldChanged(field) {
      this.searchField = field.value;
    },
    searchValueChanged(value) {
      this.searchValue = value;
      this.$store.dispatch('auth.users.push-query', {
        search: this.searchQuery,
      });
    },
  },
};
</script>
