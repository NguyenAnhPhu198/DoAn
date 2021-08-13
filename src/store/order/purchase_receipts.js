import Resource from '@/core/store/Resource';

const resource = new Resource(
  {
    service: 'order',
    resource: 'purchase_receipts'
  },
  {
    default_query: {
      searchJoin: 'and',
    }
  },
).store()

export default resource
