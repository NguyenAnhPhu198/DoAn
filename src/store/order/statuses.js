import Resource from '../Resource';

const resource = new Resource(
  {
    service: 'order',
    resource: 'statuses',
    paginate: false,
  },
  {
    default_query: {
      searchJoin: 'and',
    },
    default_detail: {
      id: null,
      name: null,
    }
  }
).store()

export default resource
