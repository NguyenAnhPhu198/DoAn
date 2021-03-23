export default class RESTApi {
  constructor(client) {
    this.client = client
  }

  query(resource, params) {
    return this.client.get(resource, { params });
  }

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get(resource, slug = "", params) {
    return this.client.get(`${resource}/${slug}`, { params });
  }

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params) {
    return this.client.post(`${resource}`, params);
  }

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(resource, slug, params) {
    return this.client.put(`${resource}/${slug}`, params);
  }

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params) {
    return this.client.put(`${resource}`, params);
  }

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource, slug) {
    return this.client.delete(`${resource}/${slug}`);
  }
}