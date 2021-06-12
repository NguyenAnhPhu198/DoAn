<template>
  <CRow>
    <CCol v-if="!!detail" class="pl-1 pr-1 ml-1" col="12">
      <slot name="detail">
        <CButton
          color="primary"
          variant="ghost"
          size="sm"
          @click="onClickDetail"
          v-c-tooltip="{
            content: 'Detail',
            appendToBody: true,
          }"
        >
          <CIcon name="cil-arrow-right" />
        </CButton>
      </slot>
    </CCol>
    <CCol v-if="!!quickView" class="pl-1 pr-1 ml-1" col="12">
      <slot name="quick-view">
        <CButton
          color="primary"
          variant="ghost"
          size="sm"
          @click="onClickQuickView"
          v-c-tooltip="{
            content: 'Quick view',
            appendToBody: true,
          }"
        >
          <CIcon name="cil-fullscreen" />
        </CButton>
      </slot>
    </CCol>
    <CCol v-if="!!remove" class="pl-1 pr-1 ml-1" col="12">
      <slot name="remove">
        <CButton
          color="danger"
          variant="ghost"
          size="sm"
          @click="onClickRemove"
          v-c-tooltip="{
            content: 'Delete',
            appendToBody: true,
          }"
        >
          <CIcon name="cil-delete" />
        </CButton>
      </slot>
    </CCol>
  </CRow>
</template>

<script>
import lodash from "@/core/plugins/lodash";
export default {
  props: {
    actions: {
      type: Array,
      default: function () {
        return ["detail", "quick-view", "remove"];
      },
      validator: function (actions) {
        return lodash.hasAll(["detail", "quick-view", "remove"], actions);
      },
    },
    slug: {
      type: String,
      required: true,
    },
    store: {
      type: String,
      required: true,
    },
    /**
     * Route resource
     */
    path: {
      type: String,
      required: true,
    },
  },
  methods: {
    onClickDetail() {
      this.$redirect.to({ path: `${this.path}/${this.slug}` });
    },
    onClickQuickView() {
      this.$redirect.to({ path: `${this.path}/${this.slug}/quick-view` });
    },
    onClickRemove() {
      this.$store.dispatch(`${this.store}.delete`, this.slug);
    },
  },
  computed: {
    detail() {
      return this.lodash.hasAll(this.actions, ["detail"]);
    },
    quickView() {
      return this.lodash.hasAll(this.actions, ["quick-view"]);
    },
    remove() {
      return this.lodash.hasAll(this.actions, ["remove"]);
    },
  },
};
</script>
