<template>
  <TModal
    title="Attachment"
    :show="show"
    :creating="creating"
    @update:show="$emit('update:show', $event)"
    @click-create="create()"
  >
    <TTableAsForm :data="attachment" :fields="fields" :splitLeft="4">
      <template #id="{ value }">
        <TInputText :value="value" @update:value="attachment.id = $event" />
      </template>
      <template #voucher_date="{ value }">
        <TInputDateTime
          :value="value"
          @update:value="attachment.voucher_date = $event"
        />
      </template>
      <template #file>
        <TInputFile :key="inputFileKey" @change="attachment.file = $event[0]" />
      </template>
    </TTableAsForm>
  </TModal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    purchase_id: {
      type: String,
      required: true,
    },
  },
  defaultAttachment: {
    id: null,
    purchase_id: null,
    voucher_date: null,
    file: null,
  },
  data() {
    return {
      attachment: this.defaultAttachment(),
      fields: [
        { key: "id" },
        { key: "voucher_date", label: "Voucher Date" },
        { key: "file" },
      ],
      inputFileKey: "inputfilekey",
    };
  },
  computed: {
    ...mapGetters({
      creating: "order.purchase_receipts.creating",
    }),
  },
  methods: {
    create() {
      this.$store
        .dispatch("order.purchase_receipts.create", this.attachment)
        .then(() => {
          this.attachment = this.defaultAttachment();
          this.inputFileKey = "" + this.lodash.random(10000, 100000);
          this.$emit("update:show", false);
        });
    },
    defaultAttachment() {
      return {
        ...this.$options.defaultAttachment,
        purchase_id: this.purchase_id,
      };
    },
  },
};
</script>
