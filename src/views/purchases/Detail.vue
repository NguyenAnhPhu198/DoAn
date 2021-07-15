<template>
  <CCard>
    <CCardHeader>
      <strong>{{ purchase.id }} </strong>
      <TMessageStatus :id="purchase.status.id" />
      <div class="float-right">
        <OrderButtonStatus
          v-for="(status, index) in purchase.steps"
          :key="index"
          :id="status"
          @click="
            $store.dispatch('order.purchases.detail.update', {
              status: status,
            })
          "
          :disabled="updating"
        />
      </div>
    </CCardHeader>
    <CCardBody>
      <CRow class="mb-4">
        <CCol sm="12" md="6" lg="4">
          <TTableAsForm title="Details" :data="purchase" :fields="detailFields">
            <template #id="{ value }">
              <TMessage :content="value" noTranslate />
            </template>
            <template #supplier_id="{ value, data }">
              <TLink
                v-if="data.supplier"
                :id="value"
                resource="suppliers"
                :content="data.supplier.name"
                :messageOptions="{ truncate: 1 }"
              />
              <TMessageNotFound v-else :slug="value" />
            </template>
            <template #buyer_id="{ value }">
              <TLink
                v-if="value"
                :id="value"
                resource="users"
                :content="value"
                :messageOptions="{ truncate: 1 }"
              />
            </template>
            <template #created_at="{ value }">
              <TMessageDateTime :content="value" small />
            </template>
            <template #updated_at="{ value }">
              <TMessageDateTime :content="value" small />
            </template>
          </TTableAsForm>
        </CCol>
        <CCol sm="12" md="6" lg="4">
          <TTableAsForm title="Dates" :data="purchase" :fields="dateFields">
            <template #expected_delivery="{ value }">
              <TMessageDateTime :content="value" editable />
            </template>
            <template #payment_due_date="{ value }">
              <TMessageDateTime :content="value" editable />
            </template>
          </TTableAsForm>
        </CCol>
        <CCol sm="12" md="6" lg="4">
          <TTableAsForm title="Costs" :data="purchase" :fields="costFields">
            <template #additional_cost="{ value }">
              <TMessageMoney
                :amount="value"
                editable
                @change="
                  $store.dispatch('order.purchases.detail.update', {
                    additional_cost: $event,
                  })
                "
              />
            </template>
            <template #balance="{ value }">
              <TMessageMoney :amount="value" />
            </template>
          </TTableAsForm>
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
            :fields="itemFields"
            store="order.purchases.detail.items"
            resource="purchases"
            noFilter
            noPaginate
            quickViewable
            removable
            creatable
            @click-create="showCreateItem = true"
          >
            <template #product_id="{ item }">
              <td>
                <ProductItems :items="[item]" />
              </td>
            </template>
            <template #tracking_id="{ item }">
              <td>
                <OrderMessageTracking :value="item.tracking_id" editable />
              </td>
            </template>
            <template #price="{ item }">
              <td>
                <TMessageMoney
                  :amount="item.price"
                  editable
                  @change="
                    $store.dispatch('order.purchases.detail.items.update', {
                      id: item.id,
                      attributes: {
                        price: $event,
                      },
                    })
                  "
                />
              </td>
            </template>
            <template #quantity="{ item }">
              <td>
                <TMessageNumber :value="item.quantity" editable />
              </td>
            </template>
            <template #tax_percent="{ item }">
              <td>
                <TMessagePercent :value="item.tax_percent" editable />
              </td>
            </template>
            <template #note="{ item }">
              <td>
                <TMessageText :value="item.note" editable />
              </td>
            </template>
            <template #amount="{ item }">
              <td>
                <TMessageMoney :amount="item.amount" editable />
              </td>
            </template>
            <template #tax="{ item }">
              <td>
                <TMessageMoney :amount="item.tax" editable />
              </td>
            </template>
            <template #balance="{ item }">
              <td>
                <TMessageMoney :amount="item.balance" />
              </td>
            </template>
          </TTableAdvance>
          <AddItem :show.sync="showCreateItem" :purchase_id="id" />
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import AddItem from "./components/AddItem.vue";

export default {
  components: {
    AddItem,
  },
  data() {
    return {
      itemFields: [
        { key: "_", label: "#" },
        { key: "product_id", label: "Product" },
        { key: "tracking_id", label: "Tracking" },
        { key: "price" },
        { key: "quantity" },
        { key: "amount", label: "Sub total" },
        { key: "tax_percent" },
        { key: "tax" },
        { key: "balance" },
        { key: "note" },
      ],
      detailFields: [
        { key: "id", label: "ID" },
        { key: "supplier_id", label: "Supplier" },
        { key: "buyer_id", label: "Buyer" },
        { key: "created_at", label: "Created at" },
        { key: "updated_at", label: "Latest update" },
      ],
      dateFields: [
        { key: "expected_delivery", label: "Expected delivery" },
        { key: "payment_due_date", label: "Due payment" },
      ],
      costFields: [
        { key: "additional_cost", label: "Additional" },
        { key: "balance", label: "Balance" },
      ],
      showCreateItem: false,
    };
  },
  created() {
    if (this.id) {
      this.$store.dispatch("order.purchases.detail.select", this.id);
    }
  },
  computed: {
    ...mapGetters({
      purchase: "order.purchases.detail",
      updating: "order.purchases.detail.updating",
    }),
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    getUrlAttachment(path_file) {
      return process.env.VUE_APP_ORDER_SERVICE_HOST + "/files/" + path_file;
    },
  },
};
</script>
