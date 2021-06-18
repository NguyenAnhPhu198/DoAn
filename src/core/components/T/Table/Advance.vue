<template>
  <CRow>
    <CCol col="12">
      <slot name="table">
        <CDataTable
          border
          :items="items"
          :fields="advanceFields"
          :loading="loading"
          :column-filter="!noFilter"
        >
          <template #_="{ item }">
            <td>
              <TListAction
                :actions="actions"
                :resource="resource"
                :slug="item[slugKey]"
                :store="store"
              />
            </td>
          </template>
          <template #_-filter>
            <TButtonResetFilter @click="$emit('resetFilter')" />
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
import TButtonResetFilter from "../Button/ResetFilter.vue";
import TListAction from "../List/Action.vue";

export default {
  components: {
    TPagination,
    TButtonResetFilter,
    TListAction,
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
    actions: {
      type: Array,
      required: false,
      default: function () {
        return ["detail"];
      },
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
    loading() {
      return this.$store.getters[this.store + ".loading"];
    },
    advanceFields() {
      return this.lodash.map(this.fields, (field) => {
        return { filter: false, _classes: "text-truncate", ...field };
      });
    },
  },
};
</script>
