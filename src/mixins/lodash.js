export default {

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

  arrayToString(source, replacement = ' ') {
    return this.replace(this.filter(source).toString(), /,/g, replacement)
  }

}