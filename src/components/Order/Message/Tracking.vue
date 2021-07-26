<template>
  <div>
    <slot name="edit" :editing="editing">
      <TInputEditable v-if="editing" :value="value">
        <template #action="{ input }">
          <TButtonSave @click="save(input)" />
          <TButtonCreate @click="create(input)" />
          <TButtonClose @click="close" />
        </template>
      </TInputEditable>
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
import actions from "@/core/components/T/Button/actions";
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
      checked: false,
    };
  },
  created() {
    this.applyTracking(this.value);
  },
  watch: {
    value(value) {
      this.applyTracking(value);
    },
  },
  computed: {
    status() {
      return this.checked ? "ReceivedAtWarehouse" : "WaitingToReceive";
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
    save(value) {
      this.setEditing(false);
      this.$emit("change", value);
    },
    create(value) {
      this.$tomoni.order.trackings
        .create({ id: value })
        .then(({ data }) => {
          this.setEditing(false);
          this.$emit("change", data.id);
        })
        .catch(({ response }) => {
          this.$store.dispatch("errors.push-http-error", response);
        });
    },
    close() {
      this.setEditing(false);
      this.$emit("close");
    },
  },
};
</script>