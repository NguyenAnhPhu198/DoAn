<template>
  <div @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div v-if="popover.active" v-c-popover="popover" />
    <CLink :to="`${resource}/${id}`">
      <slot>
        <CMessage :content="content" noTranslate v-bind="messageOptions" />
      </slot>
    </CLink>
    <div v-if="popoverContent" v-show="false">
      <component
        v-if="popover.active || hasBeenLoaded"
        :is="popoverContent"
        v-bind="popoverOptions"
        @hook:mounted="setPopoverContent"
        ref="popover"
      ></component>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    popoverContent: {
      type: Object,
      required: false,
    },
    resource: {
      type: String,
      required: true,
    },
    popoverOptions: {
      type: Object,
      required: false,
    },
    messageOptions: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      popover: {
        header: this.id,
        content: null,
        active: false,
        html: true,
        placement: "top-end",
      },
      keepOn: false,
      hasBeenLoaded: false,
    };
  },
  methods: {
    setPopoverContent() {
      this.popover.content = this.$refs.popover.$el.innerHTML;
    },
    activePopover() {
      this.keepOn = true;
      setTimeout(() => {
        if (this.keepOn) {
          this.popover.active = true;
          this.hasBeenLoaded = true;
        }
      }, 1000);
    },
    inactivePopover() {
      this.keepOn = false;
      setTimeout(() => {
        if (!this.keepOn) {
          this.popover.active = false;
        }
      }, 500);
    },
    onMouseEnter() {
      if (this.popoverContent) {
        this.activePopover();
      }
    },
    onMouseLeave() {
      if (this.popoverContent) {
        this.inactivePopover();
      }
    },
  },
};
</script>