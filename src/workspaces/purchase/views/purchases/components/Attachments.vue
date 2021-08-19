<template>
  <div>
    <TMessage
      content="Attachments:"
      creatable
      uppercase
      :addOverClasses="['d-inline-flex']"
      @click-create="showAttachment = true"
    >
      <template #suffix>
        <div class="d-inline-flex">
          <TLink
            v-for="(attachment, index) in attachments"
            :key="index"
            :content="attachment.id"
            :href="getUrlAttachment(attachment.path_file)"
            :messageOptions="{
              italic: true,
              addOverClasses: ['ml-2'],
            }"
            removable
            @click-remove="deleteAttachment(attachment.id)"
            v-c-tooltip="{
              content: attachment.voucher_date,
              placement: 'bottom',
            }"
          />
          <!-- - Paginate -->
          <!-- - Over width -->
          <TMessageNotFound v-if="!attachments" class="ml-2" />
        </div>
      </template>
    </TMessage>
    <AddAttachment :show.sync="showAttachment" :purchase_id="purchase_id" />
  </div>
</template>

<script>
import AddAttachment from "./AddAttachment.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    AddAttachment,
  },
  props: {
    purchase_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showAttachment: false,
    };
  },
  created() {
    this.$store.dispatch("order.purchase_receipts.push-query", {
      search: `purchase_id:${this.purchase_id}`,
    });
  },
  computed: {
    ...mapGetters({
      attachments: "order.purchase_receipts.list",
    }),
  },
  methods: {
    getUrlAttachment(path_file) {
      return process.env.VUE_APP_ORDER_SERVICE_HOST + "/files/" + path_file;
    },
    deleteAttachment(id) {
      this.$store.dispatch("order.purchase_receipts.delete", id);
    },
  },
};
</script>
