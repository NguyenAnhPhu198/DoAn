<template>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    enterAfter: {
      type: Number,
      required: false,
      default: 1000,
    },
    leaveAfter: {
      type: Number,
      required: false,
      default: 500,
    },
    /**
     * Dispatch setTimeout with condition
     */
    sure: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      keepOn: false,
    };
  },
  methods: {
    onMouseEnter() {
      if (!this.sure) {
        return;
      }
      this.keepOn = true;
      setTimeout(() => {
        if (this.keepOn) {
          this.$emit("enter");
        }
      }, this.enterAfter);
    },
    onMouseLeave() {
      if (!this.sure) {
        return;
      }
      this.keepOn = false;
      setTimeout(() => {
        if (!this.keepOn) {
          this.$emit("leave");
        }
      }, this.leaveAfter);
    },
  },
};
</script>