import Resource, { SubResource } from '../Resource';

const items = new SubResource({
  service: 'order',
  resource: 'purchase_items',
  bind_resource_key: 'purchase',
})

const resource = new Resource(
  {
    service: 'order',
    resource: 'purchases'
  },
  {
    query: {
      with: "items",
      appends: "supplier",
      orderBy: "created_at",
      sortedBy: "desc",
      searchJoin: 'and',
    },
    detail_query: {
      with: "items;receipts",
      appends: "supplier",
    },
    default_detail: {
      id: null,
      supplier_id: null,
      buyer_id: null,
      expected_delivery: null,
      payment_due_date: null,
      additional_cost: 0,
      created_at: null,
      updated_at: null,
      balance: 0,
      items: [],
      receipts: [],
      status: {
        id: null,
        name: null,
      },
      type: {
        id: null,
        name: null
      },
      steps: []
    }
  }
).pair(items)

export default resource
