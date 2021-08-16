/**
 * Dispatch the store after login successfully 
 * Dispatch: {service}.{resource}.fetch
 * Example: 'auth.roles', 'auth.permissions', 'product.units'
 * From: <InitStore>
 */

export default [
  'auth.roles',
  'order.statuses',
  'order.purchase_statuses',
]