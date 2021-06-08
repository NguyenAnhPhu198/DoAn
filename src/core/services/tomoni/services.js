import axios from "axios"
import { getBrowserLocale } from '@/core/plugins/i18n'
import token from './token.local'
import RESTApi from '../rest.api'

function defaultHeaders() {
  return {
    'Authorization': `Bearer ${token.get()}`,
    'Accept-Language': getBrowserLocale(),
    'Accept': 'application/json',
  }
}

// Auth service
const axiosAuth = axios.create({
  baseURL: process.env.VUE_APP_AUTH_SERVICE_HOST,
})

axiosAuth.interceptors.request.use(function (config) {
  config.headers = defaultHeaders()
  return config;
})

// Order service
const axiosOrder = axios.create({
  baseURL: process.env.VUE_APP_ORDER_SERVICE_HOST,
})

axiosOrder.interceptors.request.use(function (config) {
  config.headers = defaultHeaders()
  return config;
})

// Pruduct service
const axiosProduct = axios.create({
  baseURL: process.env.VUE_APP_PRODUCT_SERVICE_HOST,
})

axiosProduct.interceptors.request.use(function (config) {
  config.headers = defaultHeaders()
  return config;
})

const AuthService = new RESTApi(axiosAuth);
const OrderService = new RESTApi(axiosOrder);
const ProductService = new RESTApi(axiosProduct);

// ... service

export {
  AuthService,
  OrderService,
  ProductService,
}
