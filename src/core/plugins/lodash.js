import lodash from 'lodash'
import mixin from '@/mixins/lodash'

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

  //...
  ...mixin,
})

export default lodash