<template>
  <CCard>
    <CCardBody :class="getLoadingClass">
      <div class="float-right">
        <TButtonEdit v-if="editable" @click="showModalEdit = true" />
        <TButtonRemove v-if="!input.default && deletable" @click="destroy" />
      </div>
      <TMessage :content="input.consignee" noTranslate bold capitalize />
      <TMessage
        :content="input.full_address"
        noTranslate
        color="muted"
        :truncate="2"
      />
      <TMessage :content="input.tel" noTranslate />
      <TMessage
        content="Default"
        size="small"
        color="success"
        class="ml-2 float-right"
        v-if="input.default"
      >
        <template #prefix>
          <CIcon name="cil-check-alt" />
        </template>
      </TMessage>
      <TMessage
        :content="input.note"
        noTranslate
        color="muted"
        size="small"
        italic
        :truncate="1"
      />
    </CCardBody>
    <SModalAddress
      :show.sync="showModalEdit"
      :address="input"
      @updated="update"
    />
  </CCard>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    deletable: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      input_data: this.address,
      showModalEdit: false,
    };
  },
  computed: {
    input: {
      get() {
        return this.address;
      },
      set(value) {
        this.input_data = value;
      },
    },
    getLoadingClass() {
      return this.loading ? "text-secondary" : null;
    },
  },
  methods: {
    update(value) {
      this.showModalEdit = false;
      this.input = value;
    },
    destroy() {
      this.$store.dispatch("auth.addresses.delete", this.input.id);
    },
  },
};
</script>
