<template>
  <CRow>
    <CCol col="12">
      <slot name="table">
        <CDataTable
          border
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
                <CCol v-if="enterable" class="pl-1 pr-1 ml-1" col="12">
                  <TButtonEnter :slug="item[slugKey]" :resource="resource" />
                </CCol>
                <CCol v-if="quickViewable" class="pl-1 pr-1 ml-1" col="12">
                  <TButtonQuickView @click="$emit('click-quick-view')" />
                </CCol>
                <CCol v-if="removable" class="pl-1 pr-1 ml-1" col="12">
                  <TButtonRemove @click="remove(item[slugKey])" />
                </CCol>
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
    <CCol v-if="!noPaginate" col="12" class="mt-2">
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
  },
  created() {
    if (this.noPaginate) {
      this.$store.dispatch(`${this.store}.fetch.if-first-time`);
    }
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
  methods: {
    selectItem(row) {
      this.$store.commit(`${this.store}.detail.select`, row[this.slugKey]);
    },
    remove(slug) {
      this.$store.dispatch(`${this.store}.delete`, slug);
    },
  },
};
</script>
