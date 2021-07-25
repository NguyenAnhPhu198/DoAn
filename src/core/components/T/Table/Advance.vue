<template>
  <CRow>
    <CCol v-if="title" col="12" class="mb-3">
      <TMessage :content="title" uppercase />
    </CCol>
    <CCol col="12">
      <slot name="table">
        <CDataTable
          border
          :key="tableKey"
          :items="items"
          :fields="advanceFields"
          :loading="fetching"
          :column-filter="!noFilter"
          @row-clicked="selectItem"
        >
          <template v-if="creatable" #_-header>
            <CRow>
              <CCol v-if="creatable" class="pl-1 pr-1 ml-1" col="12">
                <TButtonCreate @click="$emit('click-create')" />
              </CCol>
            </CRow>
          </template>
          <template #_="{ item }">
            <td>
              <CRow>
                <slot name="actions">
                  <slot name="prepend-actions"></slot>
                  <CCol v-if="enterable" class="pl-1 pr-1 ml-1" col="12">
                    <TButtonEnter :slug="item[slugKey]" :resource="resource" />
                  </CCol>
                  <CCol v-if="quickViewable" class="pl-1 pr-1 ml-1" col="12">
                    <TButtonQuickView @click="$emit('click-quick-view')" />
                  </CCol>
                  <CCol v-if="removable" class="pl-1 pr-1 ml-1" col="12">
                    <TButtonRemove @click="remove(item)" />
                  </CCol>
                  <CCol v-if="addable" class="pl-1 pr-1 ml-1" col="12">
                    <TButtonAdd @click="$emit('click-add', item)" />
                  </CCol>
                  <slot name="append-actions" :item="item"></slot>
                </slot>
              </CRow>
            </td>
          </template>
          <template #_-filter>
            <TButtonClear @click="$emit('click-clear-filter')" />
          </template>
          <template
            v-for="(_, name) in $scopedSlots"
            :slot="name"
            slot-scope="slotData"
            ><slot :name="name" v-bind="slotData"
          /></template>
        </CDataTable>
      </slot>
    </CCol>
    <CCol v-if="!noPaginate" v-show="paginate.last > 1" col="12" class="mt-2">
      <slot name="pagination">
        <TPagination :store="store" />
      </slot>
    </CCol>
  </CRow>
</template>

<script>
import TPagination from "../Pagination.vue";
import actions from "../Button/actions";

export default {
  mixins: [actions],
  components: {
    TPagination,
  },
  props: {
    slugKey: {
      type: String,
      required: false,
      default: "id",
    },
    store: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    noFilter: {
      type: Boolean,
      required: false,
      default: false,
    },
    noPaginate: {
      type: Boolean,
      required: false,
      default: false,
    },
    autoFetching: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      tableKey: "thisistablekey",
    };
  },
  computed: {
    paginate() {
      return this.$store.getters[this.store + ".paginate"];
    },
    fetching() {
      return this.$store.getters[this.store + ".fetching"];
    },
    advanceFields() {
      return this.lodash.map(this.fields, (field) => {
        return { filter: false, _classes: "text-truncate", ...field };
      });
    },
  },
  watch: {
    // fix not rerender when init no items
    ["items.length"](newLength, oldLength) {
      if (newLength === 1 && oldLength <= 0) {
        this.refreshTable();
      }
    },
  },
  methods: {
    selectItem(row) {
      this.$store.commit(`${this.store}.select`, row[this.slugKey]);
    },
    remove(row) {
      this.selectItem(row);
      this.$store
        .dispatch(`${this.store}.detail.delete`, row[this.slugKey])
        .then(() => {
          this.$emit("row-removed", row);
        });
    },
    refreshTable() {
      this.tableKey = "" + this.lodash.random(10000, 100000);
    },
  },
};
</script>
