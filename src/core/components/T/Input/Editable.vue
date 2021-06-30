<template>
  <div class="d-inline-flex" style="max-width: 100%">
    <div class="input-group">
      <slot name="input" :setInput="setInput" :value="value">
        <CInput
          :value="value"
          v-bind="inputOptions"
          @change="setInput"
          class="mb-0"
        />
      </slot>
    </div>
    <div class="input-group-append">
      <slot name="action">
        <TButtonSave @click="onChange" />
        <TButtonClose @click="$emit('close')" />
      </slot>
    </div>
  </div>
</template>

<script>
import actions from "../Button/mixin";

export default {
  mixins: [actions],
  props: {
    value: {
      required: false,
    },
    inputOptions: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      input: this.value,
    };
  },
  methods: {
    setInput(input) {
      this.input = input;
    },
    onChange() {
      this.$emit("change", this.input);
    },
  },
};
</script>