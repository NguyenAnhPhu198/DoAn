import Resource, { Touch } from '../Resource';

const touchs = [
  new Touch({ key: 'purchase', store: 'order.purchases' })
]

const resource = new Resource(
  {
    service: 'order',
    resource: 'purchase_items'
  },
  {
    default_query: {
      searchJoin: 'and',
    }
  },
  touchs,
).store()

export default resource
