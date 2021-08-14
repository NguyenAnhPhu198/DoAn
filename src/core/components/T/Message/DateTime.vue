<template>
  <div>
    <slot name="edit" :editing="editing" :setEditing="setEditing">
      <TInputEditable
        v-if="editing"
        :value="content"
        @change="
          $emit('change', $event);
          setEditing(false);
        "
        @close="setEditing(false)"
      >
        <template #input="{ value, setInput }">
          <TInputDateTime
            :value="value"
            @update:value="setInput"
            :dateOnly="dateOnly"
          />
        </template>
      </TInputEditable>
    </slot>
    <TMessage
      v-show="!editing || dontHideWhenEditing"
      :content="content"
      :size="small ? 'small' : null"
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
import TInputDateTime from "../Input/DateTime.vue";

export default {
  mixins: [actions],
  components: {
    TMessage,
    TInputDateTime,
  },
  props: {
    content: {
      type: String,
      required: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dateOnly() {
      return this.content ? this.content.indexOf(" ") < 0 : true;
    },
  },
};
</script>