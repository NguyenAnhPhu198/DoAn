import axios from "axios"
// import { getBrowserLocale } from '@/core/plugins/i18n'
import firebaseAuth from '../firebase/auth'
import RESTApi from '../rest.api'

async function defaultHeaders() {
  return {
    'X-Firebase-IDToken': await firebaseAuth.getIdToken(),
    'Accept-Language': localStorage.getItem('lang'),
    'Accept': 'application/json',
  }
}

// Auth service
const axiosAuth = axios.create({
  baseURL: process.env.VUE_APP_AUTH_SERVICE_HOST,
})

axiosAuth.interceptors.request.use(async function (config) {
  config.headers = await defaultHeaders()
  return config;
})

// Order service
const axiosOrder = axios.create({
  baseURL: process.env.VUE_APP_ORDER_SERVICE_HOST,
})

axiosOrder.interceptors.request.use(async function (config) {
  config.headers = await defaultHeaders()
  return config;
})

// Pruduct service
const axiosProduct = axios.create({
  baseURL: process.env.VUE_APP_PRODUCT_SERVICE_HOST,
})

axiosProduct.interceptors.request.use(async function (config) {
  config.headers = await defaultHeaders()
  return config;
})

// Notification service
const axiosNotification = axios.create({
  baseURL: process.env.VUE_APP_NOTIFICATION_SERVICE_HOST,
})

axiosNotification.interceptors.request.use(async function (config) {
  config.headers = await defaultHeaders()
  return config;
})

const AuthService = new RESTApi(axiosAuth);
const OrderService = new RESTApi(axiosOrder);
const ProductService = new RESTApi(axiosProduct);
const NotificationService = new RESTApi(axiosNotification);

// ... service

export {
  AuthService,
  OrderService,
  ProductService,
  NotificationService,
}
