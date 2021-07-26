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
              <TMessageDateTime
                :content="value"
                editable
                @change="
                  $store.dispatch('order.purchases.detail.update', {
                    expected_delivery: $event,
                  })
                "
              />
            </template>
            <template #payment_due_date="{ value }">
              <TMessageDateTime
                :content="value"
                editable
                @change="
                  $store.dispatch('order.purchases.detail.update', {
                    payment_due_date: $event,
                  })
                "
              />
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
                <TMessageNotFound v-if="!purchase.receipts" class="ml-2" />
              </div>
            </template>
          </TMessage>
        </CCol>
      </CRow>
      <CRow class="mb-4">
        <CCol>
          <TTableAdvance
            :items="purchaseItems"
            :fields="itemFields"
            store="order.purchase_items"
            resource="purchases"
            title="Items:"
            noFilter
            removable
            creatable
            @click-create="showCreateItem = true"
          >
            <template #append-actions="{ item }">
              <CCol class="pl-1 pr-1 ml-1" col="12">
                <OrderButtonDistribution @click="clickDistribution(item.id)" />
              </CCol>
            </template>
            <template #product_id="{ item }">
              <td>
                <ProductItems :items="[item]" />
              </td>
            </template>
            <template #tracking_id="{ item }">
              <td>
                <OrderMessageTracking
                  :value="item.tracking_id"
                  editable
                  @change="
                    $store.dispatch('order.purchase_items.detail.update', {
                      tracking_id: $event,
                    })
                  "
                />
              </td>
            </template>
            <template #price="{ item }">
              <td>
                <TMessageMoney
                  :amount="item.price"
                  editable
                  @change="
                    $store.dispatch('order.purchase_items.detail.update', {
                      price: $event,
                    })
                  "
                />
              </td>
            </template>
            <template #quantity="{ item }">
              <td>
                <TTableAsForm
                  :data="item"
                  :fields="[
                    { key: 'quantity', label: 'Purchase' },
                    {
                      key: 'distributed_quantity',
                      label: 'Distributed',
                    },
                    {
                      key: 'remaining_distributed_quantity',
                      label: 'Remaining',
                    },
                  ]"
                  :splitLeft="7"
                  style="min-width: 250px"
                  :addRowClasses="[]"
                >
                  <template #quantity="{ value }">
                    <TMessageNumber
                      :value="value"
                      editable
                      @change="
                        $store.dispatch('order.purchase_items.detail.update', {
                          quantity: $event,
                        })
                      "
                    />
                  </template>
                  <template #quantity_distributed="{ value }">
                    <TMessageNumber :value="value" />
                  </template>
                  <template #remaining_distributed_quantity="{ value }">
                    <TMessageNumber :value="value" />
                  </template>
                </TTableAsForm>
              </td>
            </template>
            <template #tax_percent="{ item }">
              <td>
                <TMessagePercent
                  :value="item.tax_percent"
                  editable
                  @change="
                    $store.dispatch('order.purchase_items.detail.update', {
                      tax_percent: $event,
                    })
                  "
                />
              </td>
            </template>
            <template #amount="{ item }">
              <td>
                <TMessageMoney :amount="item.amount" />
              </td>
            </template>
            <template #tax="{ item }">
              <td>
                <TMessageMoney :amount="item.tax" />
              </td>
            </template>
            <template #balance="{ item }">
              <td>
                <TMessageMoney :amount="item.balance" />
              </td>
            </template>
            <template #note="{ item }">
              <td>
                <TMessageText
                  :value="item.note"
                  editable
                  :messageOptions="{ truncate: 3 }"
                  @change="
                    $store.dispatch('order.purchase_items.detail.update', {
                      note: $event,
                    })
                  "
                />
              </td>
            </template>
          </TTableAdvance>
          <AddItem :show.sync="showCreateItem" :purchase_id="id" />
          <Distribution :show.sync="showDistribution" :purchase_item="id" />
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import AddItem from "./components/AddItem.vue";
import Distribution from "./components/Distribution.vue";

export default {
  components: {
    AddItem,
    Distribution,
  },
  data() {
    return {
      itemFields: [
        { key: "_", label: "#" },
        { key: "product_id", label: "Product" },
        { key: "tracking_id", label: "Tracking" },
        { key: "price" },
        { key: "quantity", label: "Quantities" },
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
      showDistribution: false,
    };
  },
  created() {
    if (this.id) {
      this.$store.dispatch("order.purchases.detail.fetch", this.id);
      this.$store.dispatch("order.purchase_items.push-query", {
        search: `purchase_id:${this.id}`,
      });
    }
  },
  computed: {
    ...mapGetters({
      purchase: "order.purchases.detail",
      purchaseItems: "order.purchase_items.list",
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
    clickDistribution(item_id) {
      this.$store.commit("order.purchase_items.select", item_id);
      this.showDistribution = true;
    },
  },
};
</script>
