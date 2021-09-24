import Resource from '@/core/store/Resource';

const resource = new Resource(
  {
    service: 'notification',
    resource: 'districts',
    paginate: false,
  },
  {
    default_detail: {
      id: null,
      name: null,
      province_id: null,
      address: null,
    },
    default_query: {
      searchJoin: 'and',
    },
  },
).store()

export default resource
