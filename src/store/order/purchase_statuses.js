import Resource from '../Resource';

const resource = new Resource(
  {
    service: 'order',
    resource: 'statuses',
    paginate: false,
    prefix: 'order.purchase_statuses',
    prefix_state: 'order_purchase_statuses',
  },
  {
    default_query: {
      search: 'directors.type_id:purchase',
      searchJoin: 'and',
    },
    default_detail: {
      id: null,
      name: null,
    }
  }
).store()

export default resource
