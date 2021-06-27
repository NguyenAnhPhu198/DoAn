<template>
  <CCard>
    <CCardHeader>
      <strong>{{ purchase.id }} </strong>
      <TMessageStatus :id="purchase.status.id" />
      <div class="float-right">
        <CButton
          v-for="(status, index) in purchase.steps"
          :key="index"
          color="primary"
          variant="outline"
          size="sm"
          class="ml-1"
        >
          <TMessageStatus :id="status" noBadge />
        </CButton>
      </div>
    </CCardHeader>
    <CCardBody>
      <CRow class="mb-4">
        <CCol sm="4">
          <TMessage content="Details:" uppercase :addClasses="['mb-3']" />
          <table class="table table-clear">
            <tbody>
              <tr>
                <td class="left p-1"><TMessage content="ID" bold /></td>
                <td class="left p-1">
                  <TMessage :content="purchase.id" />
                </td>
              </tr>
              <tr>
                <td class="left p-1"><TMessage content="Supplier" bold /></td>
                <td class="right p-1 align-middle">
                  <TLink
                    v-if="purchase.supplier"
                    :id="purchase.supplier.id"
                    resource="suppliers"
                    :content="purchase.supplier.name"
                    :messageOptions="{ truncate: 1 }"
                  />
                  <TMessageNotFound v-else :slug="purchase.supplier_id" />
                </td>
              </tr>
              <tr>
                <td class="left p-1"><TMessage content="Buyer" bold /></td>
                <td class="right p-1 align-middle">
                  <TLink
                    v-if="purchase.buyer_id"
                    :id="purchase.buyer_id"
                    resource="users"
                    :content="purchase.buyer_id"
                    :messageOptions="{ truncate: 1 }"
                  />
                </td>
              </tr>
              <tr>
                <td class="left p-1"><TMessage content="Created" bold /></td>
                <td class="right p-1 align-middle">
                  <TMessageDateTime :content="purchase.created_at" />
                </td>
              </tr>
              <tr>
                <td class="left p-1">
                  <TMessage content="Latest updated" bold noWrap />
                </td>
                <td class="right p-1 align-middle">
                  <TMessageDateTime :content="purchase.updated_at" />
                </td>
              </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm="4">
          <TMessage content="Dates:" uppercase :addClasses="['mb-3']" />
          <table class="table table-clear">
            <tbody>
              <tr>
                <td class="left p-1">
                  <TMessage content="Expected delivery" bold />
                </td>
                <td class="right p-1 align-middle">
                  <TMessageDateTime :content="purchase.expected_delivery" />
                </td>
              </tr>
              <tr>
                <td class="left p-1">
                  <TMessage content="Due payment" bold />
                </td>
                <td class="right p-1 align-middle">
                  <TMessageDateTime :content="purchase.payment_due_date" />
                </td>
              </tr>
            </tbody>
          </table>
        </CCol>
        <CCol sm="4">
          <TMessage content="Costs:" uppercase :addClasses="['mb-3']" />
          <table class="table table-clear">
            <tbody>
              <tr>
                <td class="left p-1"><TMessage content="Additional" bold /></td>
                <td class="right p-1 align-middle">
                  <TMessageMoney :amount="purchase.additional_cost" />
                </td>
              </tr>
              <tr>
                <td class="left p-1"><TMessage content="Balance" bold /></td>
                <td class="right p-1 align-middle">
                  <TMessageMoney :amount="purchase.balance" />
                </td>
              </tr>
            </tbody>
          </table>
        </CCol>
        <CCol>
          <TMessage
            content="Attachments:"
            creatable
            uppercase
            :addOverClasses="['d-inline-flex']"
          >
            <template #suffix>
              <div class="d-inline-flex">
                <TLink
                  v-for="(receipt, index) in purchase.receipts"
                  :key="index"
                  :content="receipt.id"
                  :href="getUrlAttachment(receipt.path_file)"
                  :messageOptions="{
                    italic: true,
                    addOverClasses: ['ml-2'],
                  }"
                  removable
                />
                <TMessageNotFound
                  v-if="!purchase.receipts.length"
                  class="ml-2"
                />
              </div>
            </template>
          </TMessage>
        </CCol>
      </CRow>
      <CRow class="mb-4">
        <CCol>
          <TMessage content="Items:" uppercase :addClasses="['mb-3']" />
          <TTableAdvance
            :items="purchase.items"
            :fields="fields"
            store="order.purchases"
            resource="purchases"
            :actions="['quick-view', 'remove']"
            noFilter
            noPaginate
          >
            <template #product_id="{ item }">
              <td>
                <ProductItems :items="[item]" />
              </td>
            </template>
          </TTableAdvance>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      fields: [
        { key: "_", label: "#" },
        { key: "product_id", label: "Product" },
        { key: "tracking_id", label: "Tracking" },
        { key: "price" },
        { key: "quantity" },
        { key: "tax_percent" },
        { key: "note" },
        { key: "amount" },
        { key: "tax" },
        { key: "balance" },
        { key: "received" },
      ],
    };
  },
  created() {
    if (this.$route.params.id) {
      this.$store.dispatch(
        "order.purchases.detail.select",
        this.$route.params.id
      );
    }
  },
  computed: {
    ...mapGetters({
      purchase: "order.purchases.detail.selected",
    }),
  },
  methods: {
    getUrlAttachment(path_file) {
      return process.env.VUE_APP_ORDER_SERVICE_HOST + "/files/" + path_file;
    },
  },
};
</script>
