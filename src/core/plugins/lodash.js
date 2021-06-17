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

  /**
   * 
   * @param {Number} amount 
   * @param {Object} options 
   * @returns 
   */
  toMoney(amount, { currency, decimalLimit }) {
    const mask = createNumberMask({
      prefix: "",
      suffix: " " + this.symbolCurrency(currency),
      allowDecimal: true,
      decimalLimit: decimalLimit,
    });

    if (!decimalLimit) {
      amount = amount.toFixed(0);
    }
    return conformToMask(amount.toString(), mask)
      .conformedValue;
  },

  //...
  ...mixin,
})

export default lodash