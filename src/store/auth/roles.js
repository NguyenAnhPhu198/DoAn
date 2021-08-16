import Resource from '@/core/store/Resource';

const resource = new Resource(
  {
    service: 'auth',
    resource: 'roles',
    paginate: false,
  },
  {
    default_detail: {
      id: null,
      name: null,
    }
  },
).store()

export default resource
