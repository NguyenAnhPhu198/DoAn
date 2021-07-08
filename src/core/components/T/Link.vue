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
          <TButtonEnter
            v-show="showAction"
            :slug="id"
            :resource="resource"
            :href="href"
            @click="$emit('click-enter')"
          />
          <TButtonCreate
            v-if="creatable"
            v-show="showAction"
            @click="$emit('click-create')"
          />
          <TButtonEdit
            v-if="editable"
            v-show="showAction"
            @click="$emit('click-edit')"
          />
          <TButtonRemove
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
import TMouseTimeout from "./MouseTimeout.vue";
import actions from "./Button/actions";

export default {
  mixins: [actions],
  components: {
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