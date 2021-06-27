<template>
  <TMouseTimeout
    @enter="activePopover"
    @leave="inactivePopover"
    :sure="!!popoverContent"
  >
    <div v-if="popover.active" v-c-popover="popover" />
    <slot>
      <TMessage
        :content="content"
        noTranslate
        v-bind="messageOptions"
        :creatable="creatable"
        :editable="editable"
        :removable="removable"
        :addClasses="['btn-link']"
      >
        <template #actions="{ showAction }">
          <TButtonActionEnter
            v-show="showAction"
            :slug="id"
            :resource="resource"
            :href="href"
            @click="$emit('click-enter')"
          />
          <TButtonActionCreate
            v-if="creatable"
            v-show="showAction"
            @click="$emit('click-create')"
          />
          <TButtonActionEdit
            v-if="editable"
            v-show="showAction"
            @click="$emit('click-edit')"
          />
          <TButtonActionRemove
            v-if="removable"
            v-show="showAction"
            @click="$emit('click-remove')"
          />
        </template>
      </TMessage>
    </slot>
    <div v-if="popoverContent" v-show="false">
      <component
        v-if="popover.active || hasBeenLoaded"
        :is="popoverContent"
        v-bind="popoverOptions"
        @hook:mounted="setPopoverContent"
        ref="popover"
      ></component>
    </div>
  </TMouseTimeout>
</template>

<script>
import TButtonActionEnter from "./Button/Action/Enter.vue";
import TMouseTimeout from "./MouseTimeout.vue";

export default {
  components: {
    TButtonActionEnter: TButtonActionEnter,
    TMouseTimeout: TMouseTimeout,
  },
  props: {
    id: {
      type: [String, Number],
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    popoverContent: {
      type: Object,
      required: false,
    },
    href: {
      type: String,
      required: false,
    },
    resource: {
      type: String,
      required: false,
    },
    popoverOptions: {
      type: Object,
      required: false,
    },
    messageOptions: {
      type: Object,
      required: false,
    },
    editable: {
      type: Boolean,
      required: false,
      default: false,
    },
    removable: {
      type: Boolean,
      required: false,
      default: false,
    },
    creatable: {
      type: Boolean,
      required: false,
      default: false,
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
      hasBeenLoaded: false,
    };
  },
  methods: {
    setPopoverContent() {
      this.popover.content = this.$refs.popover.$el.innerHTML;
    },
    activePopover() {
      this.popover.active = true;
      this.hasBeenLoaded = true;
    },
    inactivePopover() {
      this.popover.active = false;
    },
  },
};
</script>