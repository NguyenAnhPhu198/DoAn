import lodash from 'lodash'
import mixin from '@/mixins/lodash'

import { conformToMask } from "vue-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

lodash.mixin({
  /**
   * 
   * @param {array} source 
   * @param {array} target 
   * @returns 
   */
  hasAll: function (source, target) {
    return target.filter(i => source.includes(i)).length === target.length
  },

  /**
   * 
   * @param {array} source 
   * @param {array} target 
   * @returns 
   */
  hasAny: function (source, target) {
    return target.filter(i => source.includes(i)).length > 0
  },

  /**
   * 
   * @param {String} currency 
   * @returns 
   */
  symbolCurrency(currency) {
    switch (currency) {
      case "VND":
        return "₫";
      case "USD":
        return "$";
      default:
        return "¥";
    }
  },

  moneyMask({ currency, decimalLimit = 6, noSymbol = false }) {
    return createNumberMask({
      prefix: "",
      suffix: noSymbol ? '' : " " + this.symbolCurrency(currency),
      allowDecimal: true,
      decimalLimit: decimalLimit,
    });
  },

  /**
   * 
   * @param {Number} amount 
   * @param {Object} options 
   * @returns 
   */
  toMoney(amount, { currency, decimalLimit = 6 }) {
    if (!decimalLimit) {
      amount = amount.toFixed(0);
    }
    return conformToMask(amount.toString(), this.moneyMask({ currency, decimalLimit }))
      .conformedValue;
  },

  //...
  ...mixin,
})

export default lodash