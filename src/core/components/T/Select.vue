<template>
  <div class="form-group">
    <label v-if="label">{{ $t(label) }}</label>
    <Multiselect
      :value="value"
      :options="options"
      :label="normalizer.label"
      :trackBy="normalizer.value"
      class="tselect"
      :selectLabel="null"
      :deselectLabel="null"
      :selectedLabel="null"
      :placeholder="null"
      @select="$emit('select', $event)"
      :loading="loading"
    >
      <template #singleLabel="{ option }">
        <TMessage :content="option.name" noTranslate noWrap size="small" />
      </template>
    </Multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";

export default {
  components: {
    Multiselect,
  },
  props: {
    label: {
      type: String,
      required: false,
    },
    value: {
      type: Object,
      required: false,
    },
    normalizer: {
      type: Object,
      default() {
        return {
          value: "id",
          label: "name",
        };
      },
    },
    options: {
      type: Array,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.tselect .multiselect__select,
.tselect .multiselect__tags {
  min-height: auto;
  height: calc(1.5em + 0.75rem + 2px);
}
.tselect input.multiselect__input,
.tselect .multiselect__option {
  font-size: 0.875rem;
}
</style>