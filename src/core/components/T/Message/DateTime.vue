<template>
  <div>
    <slot name="edit" :editing="editing" :setEditing="setEditing">
      <TInputEditable
        v-if="editing"
        :value="content"
        type="date"
        @change="
          $emit('change', $event);
          setEditing(false);
        "
        @close="setEditing(false)"
      />
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
      <template #actions="{ showAction }">
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
  </div>
</template>

<script>
import actions from "../Button/mixin";
import TMessage from "../Message.vue";

export default {
  mixins: [actions],
  components: {
    TMessage,
  },
  props: {
    content: {
      type: [String, Number],
      required: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>