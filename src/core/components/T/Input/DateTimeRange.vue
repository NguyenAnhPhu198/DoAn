<template>
  <DatePicker
    :mode="mode"
    :value="value"
    :model-config="modelConfig"
    :masks="masksConfig"
    @input="$emit('update:value', $event)"
    is-range
  >
    <template v-slot="{ inputValue, inputEvents }">
      <div class="d-inline-flex" style="min-width: 200px">
        <input
          class="form-control"
          :value="inputValue.start"
          v-on="inputEvents.start"
          placeholder="Start"
        />
        <input
          class="form-control"
          :value="inputValue.end"
          v-on="inputEvents.end"
          placeholder="End"
        />
      </div>
    </template>
  </DatePicker>
</template>

<script>
import { DatePicker } from "v-calendar";

export default {
  components: {
    DatePicker,
  },
  props: {
    value: {
      type: Object,
      required: false,
    },
    formatDate: {
      type: String,
      default: "DD-MM-YYYY",
    },
    formatTime: {
      type: String,
      default: "HH:mm:ss",
    },
    dateOnly: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      modelConfig: {
        type: "string",
        mask: this.mask(),
      },
      masksConfig: {
        input: this.mask(),
      },
      mode: this.dateOnly ? "date" : "dateTime",
    };
  },
  methods: {
    mask() {
      return this.dateOnly
        ? this.formatDate
        : this.formatDate + " " + this.formatTime;
    },
  },
};
</script>