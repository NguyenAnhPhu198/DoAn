<template>
  <CRow>
    <CCol col="12">
      <v-select
        :value="id"
        :options="options"
        @input="updateId"
        label="name"
        :loading="searching"
      >
        <template #option="option">
          <SProductItems :items="normalizeProductItem(option)" />
        </template>
        <template #search="{ attributes, events }">
          <CInput
            class="vs__search"
            v-bind="attributes"
            v-on="{
              ...events,
              input: (e) => e,
            }"
            @update:value="searchProducts"
            :value="id"
            placeholder="Search product"
          />
        </template>
        <template #selected-option-container><div></div></template>
      </v-select>
    </CCol>
    <CCol col="12" v-if="!!id" class="mt-2">
      <SProductItems :items="[{ product_id: id }]">
        <template #append="{ product }">
          <slot name="append-product-selected" :product="product"></slot>
        </template>
      </SProductItems>
    </CCol>
  </CRow>
</template>

<script>
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import SProductItems from "./Items.vue";

export default {
  components: {
    VSelect,
    SProductItems,
  },
  props: {
    id: {
      type: [Number, String],
      required: false,
    },
  },
  data() {
    return {
      options: [],
      searching: false,
    };
  },
  methods: {
    searchProducts(input) {
      if (!input) {
        return;
      }
      this.searching = true;
      this.$tomoni.product.products
        .all({ search: input })
        .then(({ data }) => {
          this.searching = false;
          this.options = data.data;
        })
        .catch(() => {
          this.searching = true;
        });
    },
    normalizeProductItem(product) {
      return [
        {
          product_id: product.id,
          product: product,
        },
      ];
    },
    updateId(product) {
      this.$emit("update:id", product.id, product);
    },
  },
};
</script>