import Resource from '@/core/store/Resource';

const resource = new Resource(
  {
    service: 'auth',
    resource: 'users'
  },
  {
    default_query: {
      orderBy: "created_at",
      sortedBy: "desc",
      searchJoin: 'and',
      searchFields: 'created_at:between;id:like;name:like;email:like;tel:like',
    },
    default_detail: {
      id: null,
      email: null,
      role_id: null,
      updated_at: null,
      created_at: null,
      role: {
        id: null,
        name: null,
      },
    }
  },
).store()

export default resource
