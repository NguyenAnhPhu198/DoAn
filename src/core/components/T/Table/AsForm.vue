<template>
  <div>
    <slot name="title">
      <TMessage :content="title + ': '" uppercase :addClasses="['mb-3']" />
    </slot>
    <slot>
      <table class="table table-clear">
        <tbody>
          <tr v-for="(field, index) in fields" :key="index">
            <td class="left p-1">
              <slot :name="field.key + '-header'" :label="getLabel(field)">
                <TMessage :content="getLabel(field)" capitalize bold />
              </slot>
            </td>
            <td class="right p-1 align-middle">
              <slot :name="field.key" :value="getValue(field.key)" :data="data">
                <TMessage :content="getValue(field.key)" />
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
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
