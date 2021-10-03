<template>
  <div class="product-search">
    <CInput
      :size="size"
      @change="onChange"
      @input="catchClear"
      :value.sync="input"
      :placeholder="$t(option.placeholder)"
      type="search"
    >
      <template #prepend-content>
        <CSelect class="m-0" @update:value="setOption" :options="options" />
      </template>
      <template #append-content><TButtonSearch @click="fireSearch" /></template>
    </CInput>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      required: false,
      default: undefined,
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
      this.input = input;
      this.fireSearch();
    },
    fireSearch() {
      this.$emit("search", {
        key: this.input,
        option: this.option,
      });
    },
    catchClear(input) {
      if (input === "") {
        this.onChange("");
      }
    },
  },
};
</script>
