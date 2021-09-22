<template>
  <CCard>
    <CCardBody :class="getLoadingClass">
      <div class="float-right">
        <TButtonEdit v-if="editable" />
        <TButtonRemove v-if="!address.default && deletable" />
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
        v-if="address.default"
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
      input: this.address,
    };
  },
  computed: {
    getLoadingClass() {
      return this.loading ? "text-secondary" : null;
    },
  },
};
</script>
