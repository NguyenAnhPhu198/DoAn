<template>
  <div class="mb-3">
    <slot name="title">
      <TMessage :content="title + ': '" uppercase :addClasses="['mb-2']" />
    </slot>
    <slot>
      <CRow v-for="(field, index) in fields" :key="index" class="p-1">
        <CCol col="5">
          <slot :name="field.key + '-header'" :label="getLabel(field)">
            <TMessage :content="getLabel(field)" capitalize bold noWrap />
          </slot>
        </CCol>
        <CCol col="7">
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
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    data: {
      type: Object,
      required: false,
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
