<template>
  <div>
    <slot name="edit" :editing="editing" :setEditing="setEditing">
      <TInputEditable
        v-if="editing"
        :value="amount"
        @change="
          $emit('change', $event);
          setEditing(false);
        "
        @close="setEditing(false)"
      >
        <template #input="{ setInput, value }">
          <TInputMoney :value="value" @update:value="setInput" />
        </template>
      </TInputEditable>
    </slot>
    <TMessage
      v-show="!editing || dontHideWhenEditing"
      :content="amountMasked()"
      bold
      noTranslate
      noWrap
      :creatable="creatable"
      :editable="editable"
      :removable="removable"
      @click-edit="showEdit()"
    >
    </TMessage>
  </div>
</template>

<script>
import actions from "../Button/actions";
import TMessage from "../Message.vue";
import TInputMoney from "../Input/Money.vue";

export default {
  mixins: [actions],
  components: {
    TMessage,
    TInputMoney,
  },
  props: {
    amount: {
      type: Number,
      required: false,
      default: 0,
    },
    currency: {
      type: String,
      required: false,
      default: "JPY",
      validator(value) {
        return ["JPY", "VND", "USD"].includes(value);
      },
    },
    decimalLimit: {
      type: Number,
      required: false,
      default: 6,
    },
  },
  data() {
    return {
      value: this.amount,
    };
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