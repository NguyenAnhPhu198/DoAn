import tomoni from '@/core/services/tomoni'

export default class Resource {

  constructor({ service, resource }, defaults) {
    this.config = {
      SERVICE: service,
      RESOURCE: resource,
      PREFIX: service + '.' + resource,
      PREFIX_STATE: service + '_' + resource,
    }
    this.defaults = defaults

    return this
  }

  store() {
    return {
      state: this.state(this.defaults, this.config),
      getters: this.getters(this.config),
      mutations: this.mutations(this.config),
      actions: this.actions(this.config),
    }
  }

  pair(sub) {
    const { state, getters, actions, mutations } = this.store()
    sub.config.PREFIX = this.config.PREFIX
    sub.config.PREFIX_STATE = this.config.PREFIX_STATE
    const sub_store = sub.store()
    return {
      state: { ...state, ...sub_store.state },
      getters: { ...getters, ...sub_store.getters },
      actions: { ...actions, ...sub_store.actions },
      mutations: { ...mutations, ...sub_store.mutations },
    }
  }

  state({
    paginate = {
      current: 1,
      last: 1,
      per: 15,
    },
    query = {},
    detail_query = {},
    detail = {},
  }, { PREFIX_STATE }) {
    return {
      [PREFIX_STATE + '_list']: [],
      [PREFIX_STATE + '_paginate']: paginate,
      [PREFIX_STATE + '_default_query']: query,
      [PREFIX_STATE + '_detail_query']: detail_query,
      [PREFIX_STATE + '_query']: {},
      [PREFIX_STATE + '_detail_selected']: detail,
      [PREFIX_STATE + '_loading']: false,
      [PREFIX_STATE + '_detail_loading']: false,
      [PREFIX_STATE + '_detail_updating']: false,
    }
  }

  getters({ PREFIX, PREFIX_STATE }) {
    return {
      [PREFIX + '.list'](state) {
        return state[PREFIX_STATE + '_list']
      },
      [PREFIX + '.paginate'](state) {
        return state[PREFIX_STATE + '_paginate']
      },
      [PREFIX + '.loading'](state) {
        return state[PREFIX_STATE + '_loading']
      },
      [PREFIX + '.query'](state) {
        return {
          ...state[PREFIX_STATE + '_default_query'],
          ...state[PREFIX_STATE + '_query'],
        }
      },
      [PREFIX + '.detail.selected'](state) {
        return state[PREFIX_STATE + '_detail_selected']
      },
      [PREFIX + '.detail.loading'](state) {
        return state[PREFIX_STATE + '_detail_loading']
      },
      [PREFIX + '.detail.updating'](state) {
        return state[PREFIX_STATE + '_detail_updating']
      },
    }
  }

  mutations({ PREFIX, PREFIX_STATE }) {
    return {
      [PREFIX + '.set-list'](state, list) {
        state[PREFIX_STATE + '_list'] = list;
      },
      [PREFIX + '.set-loading'](state, loading) {
        state[PREFIX_STATE + '_loading'] = loading;
      },
      [PREFIX + '.set-paginate'](state, { current_page, last_page, per_page }) {
        state[PREFIX_STATE + '_paginate'] = {
          current: current_page,
          last: last_page,
          per: per_page,
        }
      },
      [PREFIX + '.push-query'](state, query) {
        state[PREFIX_STATE + '_query'] = { ...state[PREFIX_STATE + '_query'], ...query };
      },
      [PREFIX + '.reset-query'](state) {
        state[PREFIX_STATE + '_query'] = {};
      },
      [PREFIX + '.detail.set-loading'](state, loading) {
        state[PREFIX_STATE + '_detail_loading'] = loading;
      },
      [PREFIX + '.detail.set-updating'](state, loading) {
        state[PREFIX_STATE + '_detail_updating'] = loading;
      },
      [PREFIX + '.detail.set-selected'](state, data) {
        state[PREFIX_STATE + '_detail_selected'] = data;
      },
      [PREFIX + '.detail.merge'](state, data) {
        state[PREFIX_STATE + '_detail_selected'] = { ...state[PREFIX_STATE + '_detail_selected'], ...data };

        // update item in list
        state[PREFIX_STATE + '_list'] = state[PREFIX_STATE + '_list'].map((item) => {
          if (item.id == data.id) {
            item = { ...item, ...data }
          }
          return item
        })
      },
    }
  }

  actions({ PREFIX, PREFIX_STATE, SERVICE, RESOURCE }) {
    return {
      [PREFIX + '.fetch'](context) {
        if (context.getters[PREFIX + '.loading']) {
          return;
        }
        return new Promise((resolve) => {
          context.commit(PREFIX + '.set-loading', true);
          tomoni[SERVICE][RESOURCE]
            .all(context.getters[PREFIX + '.query'])
            .then(({ data }) => {
              context.commit(PREFIX + '.set-list', data.data)
              context.commit(PREFIX + '.set-paginate', data)
              context.commit(PREFIX + '.set-loading', false);
              resolve(data)
            }).catch(({ response }) => {
              context.commit(PREFIX + '.set-loading', false);
              context.dispatch('errors.push-http-error', response);
            });
        });
      },
      [PREFIX + '.fetch.if-first-time'](context) {
        if (context.getters[PREFIX + '.list'].length) {
          return;
        }
        return context.dispatch(PREFIX + '.fetch');
      },
      [PREFIX + '.change-page'](context, page) {
        context.commit(PREFIX + '.push-query', { page })
        context.dispatch(PREFIX + '.fetch')
      },
      [PREFIX + '.push-query'](context, query) {
        context.commit(PREFIX + '.push-query', query)
        context.dispatch(PREFIX + '.fetch')
      },
      [PREFIX + '.apply-query'](context, query) {
        context.commit(PREFIX + '.reset-query')
        context.commit(PREFIX + '.push-query', query)
        context.dispatch(PREFIX + '.fetch')
      },
      [PREFIX + '.detail.select'](context, id) {
        // if is loading then skip
        if (context.getters[PREFIX + '.detail.loading']) {
          return;
        }
        return new Promise((resolve) => {
          context.commit(PREFIX + '.detail.set-loading', true);
          tomoni[SERVICE][RESOURCE].get(id, context.state[PREFIX_STATE + '_detail_query'])
            .then(({ data }) => {
              context.commit(PREFIX + '.detail.set-selected', data)
              context.commit(PREFIX + '.detail.set-loading', false);
              resolve(data)
            }).catch(({ response }) => {
              context.commit(PREFIX + '.detail.set-loading', false);
              context.dispatch('errors.push-http-error', response);
            });
        });
      },
      [PREFIX + '.detail.update'](context, attributes) {
        return new Promise((resolve) => {
          context.commit(PREFIX + '.detail.set-updating', true);
          tomoni[SERVICE][RESOURCE].update(context.state[PREFIX_STATE + '_detail_selected'].id, attributes)
            .then(({ data }) => {
              context.commit(PREFIX + '.detail.set-updating', false);
              context.commit(PREFIX + '.detail.merge', data)
              context.commit("toasts.push", {
                message: "Updated",
                type: "success",
              });
              resolve(data)
            }).catch(({ response }) => {
              context.commit(PREFIX + '.detail.set-updating', false);
              context.dispatch('errors.push-http-error', response);
            });
        });
      },
    }
  }
}

export class SubResource {
  constructor({ service, resource, bind_resource_key, sub_key = 'items' }) {
    this.config = {
      SERVICE: service,
      RESOURCE: resource,
      PREFIX: service + '.' + resource,
      PREFIX_STATE: service + '_' + resource,
      SUB_KEY: sub_key,
      BIND_RESOURCE_KEY: bind_resource_key,
    }
    return this
  }

  store() {
    return {
      mutations: this.mutations(this.config),
      actions: this.actions(this.config),
    }
  }

  mutations({ PREFIX, PREFIX_STATE, SUB_KEY, BIND_RESOURCE_KEY }) {
    return {
      [`${PREFIX}.detail.${SUB_KEY}.push`](state, item) {
        state[PREFIX_STATE + '_detail_selected'][SUB_KEY].push(item)
      },
      [`${PREFIX}.detail.${SUB_KEY}.remove`](state, item_id) {
        let deleteIndex = state[PREFIX_STATE + '_detail_selected'][SUB_KEY].findIndex((item) => item.id == item_id)
        state[PREFIX_STATE + '_detail_selected'][SUB_KEY].splice(deleteIndex, 1)
      },
      [`${PREFIX}.detail.${SUB_KEY}.merge`](state, { id, data }) {
        state[PREFIX_STATE + '_detail_selected'][SUB_KEY] = state[PREFIX_STATE + '_detail_selected'][SUB_KEY].map((item) => {
          if (item.id == id) {
            return data
          }
          return item
        })

        if (BIND_RESOURCE_KEY) {
          this.commit(PREFIX + '.detail.merge', data[BIND_RESOURCE_KEY])
        }
      },
    }
  }

  actions({ PREFIX, SUB_KEY, SERVICE, RESOURCE }) {
    return {
      [`${PREFIX}.detail.${SUB_KEY}.update`](context, { id, attributes }) {
        return new Promise((resolve) => {
          tomoni[SERVICE][RESOURCE].update(id, attributes)
            .then(({ data }) => {
              context.commit(`${PREFIX}.detail.${SUB_KEY}.merge`, { id, data })
              context.commit("toasts.push", {
                message: "Updated",
                type: "success",
              });
              resolve(data)
            }).catch(({ response }) => {
              context.dispatch('errors.push-http-error', response);
            });
        });
      },
      [`${PREFIX}.detail.${SUB_KEY}.delete`](context, id) {
        return new Promise((resolve) => {
          tomoni[SERVICE][RESOURCE].delete(id)
            .then(({ data }) => {
              context.commit(`${PREFIX}.detail.${SUB_KEY}.remove`, id)
              context.commit("toasts.push", {
                message: "Deleted",
                type: "success",
              });
              resolve(data)
            }).catch(({ response }) => {
              context.dispatch('errors.push-http-error', response);
            });
        });
      },
    }
  }
}