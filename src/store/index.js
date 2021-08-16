import purchases from './order/purchases'
import statuses from './order/statuses'
import purchase_statuses from './order/purchase_statuses'
import purchase_items from './order/purchase_items'
import purchase_receipts from './order/purchase_receipts'
import distributions from './order/distributions'
import roles from './auth/roles'
import users from './auth/users'

export default [
  statuses,
  purchases,
  purchase_items,
  purchase_receipts,
  purchase_statuses,
  distributions,
  roles,
  users,
]