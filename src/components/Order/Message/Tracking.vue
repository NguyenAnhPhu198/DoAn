<template>
  <div>
    <slot name="edit" :editing="editing" :setEditing="setEditing">
      <TInputEditable
        v-if="editing"
        :value="id"
        @change="
          $emit('change', $event);
          setEditing(false);
        "
        @close="setEditing(false)"
      />
    </slot>
    <TMessage
      v-show="!editing || dontHideWhenEditing"
      :content="value"
      :size="small ? 'small' : null"
      noTranslate
      :creatable="creatable"
      :editable="editable"
      :removable="removable"
      @click-edit="showEdit()"
    >
    </TMessage>
    <TMessageStatus v-if="value" :id="status" />
  </div>
</template>

<script>
import actions from "@/core/components/T/Button/mixin";
import TMessage from "@/core/components/T/Message.vue";

export default {
  mixins: [actions],
  components: {
    TMessage,
  },
  props: {
    value: {
      type: [String, Number],
      required: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      id: this.value,
      checked: false,
    };
  },
  created() {
    this.applyTracking(this.id);
  },
  watch: {
    value(value) {
      this.applyTracking(value);
    },
  },
  computed: {
    status() {
      return this.checked ? "ReceivedAtWarehouse" : "Approved";
    },
  },
  methods: {
    applyTracking(id) {
      if (!id) {
        return;
      }
      this.$tomoni.order.trackings.get(id).then(({ data }) => {
        this.checked = data.checked;
      });
    },
  },
};
</script>