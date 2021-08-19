import Resource, { Touch } from '@/core/store/Resource';

const touchs = [
  new Touch({ key: 'purchase_item', store: 'order.purchase_items' })
]

const resource = new Resource(
  {
    service: 'order',
    resource: 'distributions'
  },
  {
    default_query: {
      searchJoin: 'and',
      with: "orderItem",
    },
    default_detail: {
      id: null,
      purchase_product_id: null,
      order_product_id: null,
      price: null,
      quantity: null,
    }
  },
  touchs,
).store()

export default resource
