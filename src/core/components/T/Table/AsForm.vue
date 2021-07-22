<template>
  <div class="mb-3">
    <slot name="title" v-if="!!title">
      <TMessage :content="title + ': '" uppercase :addClasses="['mb-2']" />
    </slot>
    <slot>
      <CRow
        v-for="(field, index) in fields"
        :key="index"
        :class="addRowClasses"
      >
        <CCol :col="splitLeft">
          <slot :name="field.key + '-header'" :label="getLabel(field)">
            <TMessage :content="getLabel(field)" capitalize bold noWrap />
          </slot>
        </CCol>
        <CCol :col="12 - splitLeft">
          <slot
            :name="field.key"
            :value="getValue(field.key)"
            :label="getLabel(field)"
            :data="data"
          >
            <TMessage :content="getValue(field.key)" />
          </slot>
        </CCol>
      </CRow>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },
    fields: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      required: false,
    },
    splitLeft: {
      type: Number,
      required: false,
      default: 5,
    },
    addRowClasses: {
      type: Array,
      required: false,
      default: function () {
        return ["p-1"];
      },
    },
  },
  methods: {
    getLabel(field) {
      return field.label ?? field.key;
    },
    getValue(key) {
      return this.data[key];
    },
  },
};
</script>
