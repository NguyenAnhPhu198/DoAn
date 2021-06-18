<template>
  <Message :content="amountMasked()" bold noTranslate noWrap />
</template>

<script>
import Message from "../Message.vue";

export default {
  components: {
    Message,
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