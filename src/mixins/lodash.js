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
  }

}