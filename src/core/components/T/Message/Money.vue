<template>
  <TMessage
    :content="amountMasked()"
    bold
    noTranslate
    noWrap
    :creatable="creatable"
    :editable="editable"
    :removable="removable"
  >
    <template #actions="{ showAction }">
      <TButtonCreate
        v-if="creatable"
        v-show="showAction"
        @click="$emit('click-create')"
      />
      <TButtonEdit
        v-if="editable"
        v-show="showAction"
        @click="$emit('click-edit')"
      />
      <TButtonRemove
        v-if="removable"
        v-show="showAction"
        @click="$emit('click-remove')"
      />
    </template>
  </TMessage>
</template>

<script>
import actions from "../Button/mixin";
import TMessage from "../Message.vue";

export default {
  mixins: [actions],
  components: {
    TMessage,
  },
  props: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: false,
      default: "JPY",
    },
    decimalLimit: {
      type: Number,
      required: false,
      default: 6,
    },
  },
  methods: {
    amountMasked() {
      return this.lodash.toMoney(this.amount, {
        currency: this.currency,
        decimalLimit: this.decimalLimit,
      });
    },
  },
};
</script>