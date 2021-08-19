import lodash from 'lodash'
import mixin from '@/mixins/lodash'

import { conformToMask } from "vue-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

export const masks = {
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
    if (typeof amount != 'number') {
      amount = 0;
    }
    if (!decimalLimit) {
      amount = amount.toFixed(0);
    }
    return conformToMask(amount.toString(), this.moneyMask({ currency, decimalLimit }))
      .conformedValue;
  },

  numberMask({ allowDecimal = true, decimalLimit = 2, integerLimit = 12, suffix = "" }) {
    return createNumberMask({
      prefix: "",
      suffix: suffix,
      allowDecimal: allowDecimal,
      decimalLimit: decimalLimit,
      integerLimit: integerLimit,
    });
  },

  toPercent(number, options = {}) {
    if (!options.decimalLimit) {
      number = number.toFixed(0);
    }
    return conformToMask(number.toString(), this.numberMask({ suffix: '%', ...options }))
      .conformedValue;
  },
}

lodash.mixin({
  /**
   * 
   * @param {array} source 
   * @param {array} target 
   * @returns 
   */
  hasAll: function (source, target) {
    if (!source) {
      return false
    }
    return target.filter(i => source.includes(i)).length === target.length
  },

  /**
   * 
   * @param {array} source 
   * @param {array} target 
   * @returns 
   */
  hasAny: function (source, target) {
    if (!source) {
      return false
    }
    return target.filter(i => source.includes(i)).length > 0
  },

  /**
   * Convert data for CSelect
   * 
   * @param {Array} source 
   * @param {Object} targets 
   * @param {Object} keys 
   * @return {Object}
   */
  'normalizeCSelect': function (source, targets = { value: 'id', label: 'name' }, keys = { value: 'id', label: 'label' }) {
    const result = !source ? null : source.map(function (item) {
      return {
        [keys.value]: item[targets.value],
        [keys.label]: item[targets.label]
      }
    })
    return result
  },

  /**
   * Kiểm tra phải có tất cả các key trong danh sách object
   * 
   * @param {array} source 
   * @param {string} key 
   */
  hasKeyObjects(source, key) {
    return source.filter((item) => this.has(item, key)).length ==
      source.length
  },

  /**
   * 
   * @param {*} source 
   * @param {*} replacement 
   * @returns 
   */
  arrayToString(source, replacement = ' ') {
    return this.replace(this.filter(source).toString(), /,/g, replacement)
  },

  ...masks,
  //...
  ...mixin,
})

export default lodash