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
        <template #input="{ setInput, value }">
          <TInputNumber
            :value="value"
            @update:value="setInput"
            :maskOptions="{ integerLimit: 2 }"
          />
        </template>
      </TInputEditable>
    </slot>
    <TMessage
      v-show="!editing || dontHideWhenEditing"
      :content="percentMasked()"
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
import TInputNumber from "../Input/Number.vue";

export default {
  mixins: [actions],
  components: {
    TMessage,
    TInputNumber,
  },
  props: {
    value: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  methods: {
    percentMasked() {
      return this.lodash.toPercent(this.value);
    },
  },
};
</script>