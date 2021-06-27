<template>
  <div :class="serializeOverClass">
    <slot name="over-prefix"></slot>
    <div
      :class="serializeClass"
      @mouseenter="showAction = true"
      @mouseleave="showAction = false"
    >
      <div class="position-absolute" style="transform: translate(0, -90%)">
        <slot name="actions" :showAction="showAction">
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
        </slot>
      </div>
      <slot name="prefix"></slot>
      <slot>
        {{ getContent() }}
      </slot>
      <slot name="suffix"></slot>
    </div>
    <slot name="over-suffix"></slot>
  </div>
</template>

<script>
import TButtonActionEdit from "./Button/Action/Edit.vue";
import TButtonActionRemove from "./Button/Action/Remove.vue";
import TButtonActionCreate from "./Button/Action/Create.vue";

export default {
  components: {
    TButtonActionEdit: TButtonActionEdit,
    TButtonActionRemove: TButtonActionRemove,
    TButtonActionCreate: TButtonActionCreate,
  },
  props: {
    content: {
      type: [String, Number],
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    bold: {
      type: Boolean,
      required: false,
      default: false,
    },
    italic: {
      type: Boolean,
      required: false,
      default: false,
    },
    lowercase: {
      type: Boolean,
      required: false,
      default: false,
    },
    uppercase: {
      type: Boolean,
      required: false,
      default: false,
    },
    capitalize: {
      type: Boolean,
      required: false,
      default: false,
    },
    truncate: {
      type: Number,
      required: false,
      default: 0, // 0 is not truncate
    },
    noWrap: {
      type: Boolean,
      required: false,
      default: false,
    },
    alignment: {
      type: String,
      required: false,
      default: "left",
    },
    justify: {
      type: Boolean,
      required: false,
      default: false,
    },
    noTranslate: {
      type: Boolean,
      required: false,
      default: false,
    },
    addClasses: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
    },
    addOverClasses: {
      type: Array,
      required: false,
      default: function () {
        return [];
      },
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
      showAction: false,
    };
  },
  computed: {
    serializeClass() {
      const properties = [
        this.color ? `text-${this.color}` : null,
        this.size,
        this.bold ? "font-weight-bold" : null,
        this.italic ? "font-italic" : null,
        this.lowercase ? "text-lowercase" : null,
        this.uppercase ? "text-uppercase" : null,
        this.capitalize ? "text-capitalize" : null,
        this.truncate ? `text-truncate-${this.truncate}` : null,
        this.noWrap ? "text-truncate" : null,
        this.alignment ? `text-${this.alignment}` : null,
        this.justify ? `text-justify` : null,
        ...this.addClasses,
      ];
      return this.lodash.arrayToString(properties);
    },
    serializeOverClass() {
      const properties = [...this.addOverClasses];
      return this.lodash.arrayToString(properties);
    },
  },
  methods: {
    getContent() {
      return this.content || "...";
    },
  },
};
</script>