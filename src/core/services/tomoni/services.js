import axios from "axios"
import { getBrowserLocale } from '../i18n'
import token from './token.local'

class ApiService {
  constructor(axios) {
    this.axios = axios
  }

  query(resource, params) {
    return this.axios.get(resource, { params });
  }

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get(resource, slug = "", params) {
    return this.axios.get(`${resource}/${slug}`, { params });
  }

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params) {
    return this.axios.post(`${resource}`, params);
  }

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(resource, slug, params) {
    return this.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params) {
    return this.axios.put(`${resource}`, params);
  }

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource, slug) {
    return this.axios.delete(`${resource}/${slug}`);
  }
}

const defaultHeaders = {
  'Authorization': `Bearer ${token.get()}`,
  'Accept-Language': getBrowserLocale(),
}

const AuthService = new ApiService(axios.create({
  baseURL: process.env.VUE_APP_AUTH_SERVICE_HOST,
  headers: defaultHeaders,
}));

export {
  AuthService,
}

export default ApiService
