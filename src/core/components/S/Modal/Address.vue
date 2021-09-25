<template>
  <TModal
    title="Address"
    :show="show"
    @update:show="$emit('update:show', $event)"
  >
    <template #actions>
      <TButtonCreate
        :options="{ disabled: loading }"
        variant="outline"
        @click="create"
        v-if="!is_edit"
      />
      <TButtonSave
        variant="outline"
        @click="update"
        v-if="is_edit"
        :options="{ disabled: loading }"
      />
    </template>
    <CRow>
      <CCol col="6">
        <CInput :label="$t('Consignee')" :value.sync="input.consignee" />
      </CCol>
      <CCol col="6">
        <CInput :label="$t('Tel')" :value.sync="input.tel" />
      </CCol>
    </CRow>
    <hr />
    <SSelectAddress
      v-if="show"
      :ward_id.sync="input.ward_id"
      :address_detail.sync="input.address_detail"
    />
    <hr />
    <CRow>
      <CCol>
        <CInput :label="$t('Note')" :value.sync="input.note" />
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CInputCheckbox
          :label="$t('Set as default')"
          :checked.sync="input.set_as_default"
        />
      </CCol>
    </CRow>
  </TModal>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    address: {
      type: Object,
      required: false,
    },
  },
  inputDefault: {
    consignee: null,
    tel: null,
    note: null,
    set_as_default: false,
    ward_id: null,
    address_detail: null,
  },
  data() {
    return {
      input_data: this.getInput(),
      loading: false,
    };
  },
  computed: {
    is_edit() {
      if (!this.address) {
        return false;
      }
      return !!this.address.id;
    },
    input: {
      get: function () {
        return this.getInput();
      },
      set: function (newValue) {
        this.input_data = newValue;
      },
    },
    data_submit() {
      return {
        ...this.input,
        default: +this.input.set_as_default,
        address: this.input.address_detail,
      };
    },
  },
  methods: {
    create() {
      this.loading = true;
      this.$store
        .dispatch("auth.addresses.create", this.data_submit)
        .then((data) => {
          this.clearForm();
          this.$emit("created", data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    update() {
      this.loading = true;
      this.$store
        .dispatch("auth.addresses.update", {
          id: this.address.id,
          attributes: this.data_submit,
        })
        .then((data) => {
          this.$emit("updated", data);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getInput() {
      if (!this.is_edit) {
        return this.inputDefault();
      }
      return {
        ...this.address,
        set_as_default: this.address.default,
        address_detail: this.address.address,
      };
    },
    inputDefault() {
      return { ...this.$options.inputDefault };
    },
    clearForm() {
      this.input = this.inputDefault();
    },
  },
};
</script>