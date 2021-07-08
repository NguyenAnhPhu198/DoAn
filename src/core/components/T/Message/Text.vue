<template>
  <div>
    <slot name="edit" :editing="editing" :setEditing="setEditing">
      <TInputEditable
        v-if="editing"
        :value="value"
        @change="
          $emit('change', $event);
          setEditing(false);
        "
        @close="setEditing(false)"
      >
      </TInputEditable>
    </slot>
    <TMessage
      v-show="!editing || dontHideWhenEditing"
      :content="value"
      noTranslate
      :creatable="creatable"
      :editable="editable"
      :removable="removable"
      @click-edit="showEdit()"
    >
    </TMessage>
  </div>
</template>

<script>
import actions from "../Button/actions";
import TMessage from "../Message.vue";

export default {
  mixins: [actions],
  components: {
    TMessage,
  },
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: 0,
    },
  },
};
</script>