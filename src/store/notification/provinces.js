import Resource from '@/core/store/Resource';

const resource = new Resource(
  {
    service: 'notification',
    resource: 'provinces',
    paginate: false,
  },
  {
    default_detail: {
      id: null,
      name: null,
      country_id: null,
    },
    default_query: {
      searchJoin: 'and',
    },
  },
).store()

export default resource
