<template>
  <div class="search-box">
    <CInput
      size="lg"
      :placeholder="placeholder"
      class="search-box-input mb-0"
      @update:value="onChange"
      :value.sync="input"
      type="search"
    >
      <template #prepend-content
        ><CIcon name="cil-magnifying-glass"
      /></template>
    </CInput>
    <div
      v-for="filter in filters"
      :key="filter.value"
      class="p-1 ml-0 search-box-option"
    >
      <CButton
        shape="square"
        :variant="getVariant(filter)"
        color="primary"
        @click="setActiveFilter(filter)"
      >
        <TMessage :content="filter.name" />
      </CButton>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filters: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      active: this.lodash.find(this.filters, (filter) => filter.default) || {
        value: "",
        name: "",
      },
      input: "",
    };
  },
  computed: {
    placeholder() {
      return `Search by ${this.active.name}`;
    },
  },
  methods: {
    setActiveFilter(filter) {
      this.active = filter;
      this.onChange(this.input);
    },
    onChange(input) {
      this.$emit("search", {
        key: input,
        filter: this.active,
      });
    },
    getVariant(filter) {
      return filter.value === this.active.value ? "" : "outline";
    },
  },
};
</script>

<style>
.search-box {
  background: #477a8b;
  border-radius: unset !important;
  display: flex;
  box-shadow: 0px 0px 2px 0px #477a8b;
  padding: 4px;
}

.search-box button:focus {
  box-shadow: unset;
}

.search-box .input-group-text {
  border-radius: unset !important;
}

.search-box .search-box-input {
  width: 100%;
}

.search-box .input-group-text {
  background: white;
}

.search-box input {
  border-radius: 0 !important;
  border: unset !important;
  padding-left: 0 !important;
}

.search-box input:focus {
  border: unset;
  box-shadow: unset;
}

.search-box .search-box-option {
  background: white;
}
</style>