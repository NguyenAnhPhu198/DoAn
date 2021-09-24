import Resource from '@/core/store/Resource';

const resource = new Resource(
  {
    service: 'notification',
    resource: 'wards',
    paginate: false,
  },
  {
    default_detail: {
      id: null,
      name: null,
      district_id: null,
      address: null,
      province: {
        id: null,
        name: null,
        country_id: null,
      },
    },
    detail_query: {
      with: 'province',
    },
    default_query: {
      searchJoin: 'and',
    },
  },
).store()

const PREFIX = 'notification.wards'

const actions = {
  [PREFIX + '.detail.fetch-missing'](context, id) {
    return context.dispatch(PREFIX + '.detail.fetch', id).then((ward) => {
      context.dispatch(PREFIX + '.push-query', {
        search: `district_id:${ward.district_id}`,
      });
      context.dispatch('notification.districts.push-query', {
        search: `province_id:${ward.province.id}`
      }).then(() => {
        context.commit('notification.districts.select', ward.district_id)
        context.commit('notification.provinces.select', ward.province.id)
      })
    })
  },
}

export default {
  ...resource,
  actions: { ...resource.actions, ...actions }
}
