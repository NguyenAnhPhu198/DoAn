import Resource from '@/core/store/Resource';

const resource = new Resource(
  {
    service: 'auth',
    resource: 'addresses'
  },
  {
    default_detail: {
      id: null,
      user_id: null,
      consignee: null,
      address: null,
      tel: null,
      ward_id: null,
      note: null,
      full_address: null,
      updated_at: null,
      created_at: null,
    }
  },
).store()

export default resource
