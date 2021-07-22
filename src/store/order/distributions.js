import Resource from '../Resource';

const resource = new Resource(
  {
    service: 'order',
    resource: 'distributions'
  },
  {
    query: {
      with: "orderItem",
    },
    default_detail: {
      id: null,
      purchase_product_id: null,
      order_product_id: null,
      price: null,
      quantity: null,
    }
  }
).store()

export default resource
