<template>
  <div class="product-search">
    <CInput
      :size="size"
      @update:value="onChange"
      :value.sync="input"
      :placeholder="option.placeholder"
      type="search"
    >
      <template #prepend-content>
        <CSelect class="m-0" @update:value="setOption" :options="options" />
      </template>
      <template #append-content><CIcon name="cil-magnifying-glass" /></template>
    </CInput>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      required: false,
      default: "md",
    },
    options: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      option: this.lodash.find(this.options, (option) => option.default) || {
        value: "",
        label: "",
        placeholder: "",
      },
      input: "",
    };
  },
  methods: {
    setOption(value) {
      this.option = this.lodash.find(
        this.options,
        (option) => option.value === value
      );
      this.onChange(this.input);
    },
    onChange(input) {
      this.$emit("search", {
        key: input,
        option: this.option,
      });
    },
  },
};
</script>
