import Resource from '../Resource';

const resource = new Resource(
  {
    service: 'order',
    resource: 'purchases'
  },
  {
    default_query: {
      with: "items",
      appends: "supplier",
      orderBy: "created_at",
      sortedBy: "desc",
      searchJoin: 'and',
    },
    detail_query: {
      with: "receipts",
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
  },
).store()

export default resource
