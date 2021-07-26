import tomoni from '@/core/services/tomoni'

export class Touch {
  constructor({ key, store }) {
    this.KEY = key
    this.STORE = store
  }
}

export default class Resource {

  constructor({ prefix = null, prefix_state = null, service, resource, primary_key = 'id', paginate = true }, defaults = {}, touches = []) {
    this.config = {
      SERVICE: service,
      RESOURCE: resource,
      PREFIX: prefix ?? service + '.' + resource,
      PREFIX_STATE: prefix_state ?? service + '_' + resource,
      PRIMARY_KEY: primary_key,
      PAGINATE: paginate,
    }
    this.defaults = defaults
    this.touches = touches ?? []

    return this
  }

  store() {
    return {
      state: this.state(this.defaults, this.config),
      getters: this.getters(this.config),
      mutations: this.mutations(this.config, this.touches),
      actions: this.actions(this.config, this.touches),
    }
  }

  state({
    paginate = {
      current: 1,
      last: 1,
      per: 15,
    },
    default_query = {},
    detail_query = {},
    default_detail = {},
  }, { PREFIX_STATE }) {
    return {
      [PREFIX_STATE + '_list']: [],
      [PREFIX_STATE + '_paginate']: paginate,
      [PREFIX_STATE + '_default_query']: default_query,
      [PREFIX_STATE + '_query']: {},
      [PREFIX_STATE + '_fetching']: false,
      [PREFIX_STATE + '_creating']: false,
      [PREFIX_STATE + '_default_detail']: default_detail,
      [PREFIX_STATE + '_detail']: default_detail,
      [PREFIX_STATE + '_detail_query']: detail_query,
      [PREFIX_STATE + '_detail_fetching']: false,
      [PREFIX_STATE + '_detail_updating']: false,
      [PREFIX_STATE + '_detail_deleting']: false,
    }
  }

  getters({ PREFIX, PREFIX_STATE, PRIMARY_KEY }) {
    return {
      [PREFIX + '.list'](state) {
        return state[PREFIX_STATE + '_list']
      },
      [PREFIX + '.paginate'](state) {
        return state[PREFIX_STATE + '_paginate']
      },
      [PREFIX + '.fetching'](state) {
        return state[PREFIX_STATE + '_fetching']
      },
      [PREFIX + '.creating'](state) {
        return state[PREFIX_STATE + '_creating']
      },
      [PREFIX + '.query'](state) {
        return {
          ...state[PREFIX_STATE + '_default_query'],
          ...state[PREFIX_STATE + '_query'],
        }
      },
      [PREFIX + '.detail'](state) {
        return {
          ...state[PREFIX_STATE + '_default_detail'],
          ...state[PREFIX_STATE + '_detail'],
        }
      },
      [PREFIX + '.detail.id'](state) {
        return state[PREFIX_STATE + '_detail'][PRIMARY_KEY]
      },
      [PREFIX + '.detail.fetching'](state) {
        return state[PREFIX_STATE + '_detail_fetching']
      },
      [PREFIX + '.detail.updating'](state) {
        return state[PREFIX_STATE + '_detail_updating']
      },
      [PREFIX + '.detail.deleting'](state) {
        return state[PREFIX_STATE + '_detail_deleting']
      },
    }
  }

  mutations({ PREFIX, PREFIX_STATE, PRIMARY_KEY }, touches) {
    return {
      [PREFIX + '.set-list'](state, list) {
        state[PREFIX_STATE + '_list'] = list;
      },
      [PREFIX + '.push-list'](state, item) {
        state[PREFIX_STATE + '_list'].push(item)

        // touch to relations
        touches.forEach((touch) => {
          this.commit(touch.STORE + '.merge', item[touch.KEY])
        })
      },
      [PREFIX + '.merge'](state, data) {
        if (state[PREFIX_STATE + '_detail'][PRIMARY_KEY] == data[PRIMARY_KEY]) {
          this.commit(PREFIX + '.detail.merge', data)
        }

        state[PREFIX_STATE + '_list'] = state[PREFIX_STATE + '_list'].map((item) => {
          if (item[PRIMARY_KEY] == data[PRIMARY_KEY]) {
            item = { ...item, ...data }

            // touch to relations
            touches.forEach((touch) => {
              this.commit(touch.STORE + '.merge', item[touch.KEY])
            })
          }
          return item
        })
      },
      [PREFIX + '.set-fetching'](state, fetching) {
        state[PREFIX_STATE + '_fetching'] = fetching;
      },
      [PREFIX + '.set-creating'](state, creating) {
        state[PREFIX_STATE + '_creating'] = creating;
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
      [PREFIX + '.detail.set-fetching'](state, fetching) {
        state[PREFIX_STATE + '_detail_fetching'] = fetching;
      },
      [PREFIX + '.detail.set-updating'](state, updating) {
        state[PREFIX_STATE + '_detail_updating'] = updating;
      },
      [PREFIX + '.detail.set-creating'](state, creating) {
        state[PREFIX_STATE + '_detail_creating'] = creating;
      },
      [PREFIX + '.detail.set-deleting'](state, deleting) {
        state[PREFIX_STATE + '_detail_deleting'] = deleting;
      },
      [PREFIX + '.detail.set-detail'](state, data) {
        state[PREFIX_STATE + '_detail'] = data;
      },
      [PREFIX + '.select'](state, id) {
        const selected = state[PREFIX_STATE + '_list'].find((item) => item[PRIMARY_KEY] == id)
        this.commit(PREFIX + '.detail.set-detail', selected);
      },
      [PREFIX + '.detail.merge'](state, data) {
        if (state[PREFIX_STATE + '_detail'] == data) {
          return
        }

        // merge detail
        state[PREFIX_STATE + '_detail'] = { ...state[PREFIX_STATE + '_detail'], ...data };

        // merge list
        this.commit(PREFIX + '.merge', state[PREFIX_STATE + '_detail'])
      },
      [PREFIX + '.delete'](state, { id, data }) {
        state[PREFIX_STATE + '_list'] = state[PREFIX_STATE + '_list'].filter((item) => item[PRIMARY_KEY] != id)

        // touch to relations
        if (data) {
          touches.forEach((touch) => {
            this.commit(touch.STORE + '.merge', data[touch.KEY])
          })
        }
      },
    }
  }

  actions({ PREFIX, PREFIX_STATE, SERVICE, RESOURCE, PAGINATE }) {
    return {
      [PREFIX + '.fetch'](context) {
        if (context.getters[PREFIX + '.fetching']) {
          return;
        }
        return new Promise((resolve) => {
          context.commit(PREFIX + '.set-fetching', true);
          tomoni[SERVICE][RESOURCE]
            .all(context.getters[PREFIX + '.query'])
            .then(({ data }) => {
              if (PAGINATE) {
                context.commit(PREFIX + '.set-list', data.data)
                context.commit(PREFIX + '.set-paginate', data)
              } else {
                context.commit(PREFIX + '.set-list', data)
              }
              context.commit(PREFIX + '.set-fetching', false);
              resolve(data)
            }).catch(({ response }) => {
              context.commit(PREFIX + '.set-fetching', false);
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
      [PREFIX + '.create'](context, attributes) {
        return new Promise((resolve) => {
          context.commit(PREFIX + '.detail.set-creating', true);
          tomoni[SERVICE][RESOURCE].create(attributes)
            .then(({ data }) => {
              context.commit(PREFIX + '.detail.set-creating', false);
              context.commit(PREFIX + '.push-list', data)
              context.commit("toasts.push", {
                message: "Created",
                type: "success",
              });
              resolve(data)
            }).catch(({ response }) => {
              context.commit(PREFIX + '.detail.set-creating', false);
              context.dispatch('errors.push-http-error', response);
            });
        });
      },
      [PREFIX + '.update'](context, { id, attributes }) {
        return new Promise((resolve) => {
          tomoni[SERVICE][RESOURCE].update(id, attributes)
            .then(({ data }) => {
              context.commit(PREFIX + '.merge', data)
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
      [PREFIX + '.delete'](context, id) {
        return new Promise((resolve) => {
          tomoni[SERVICE][RESOURCE].delete(id)
            .then(({ data }) => {
              context.commit(PREFIX + '.delete', id);
              context.commit("toasts.push", {
                message: "Created",
                type: "success",
              });
              resolve(data)
            }).catch(({ response }) => {
              context.dispatch('errors.push-http-error', response);
            });
        });
      },
      [PREFIX + '.detail.fetch'](context, id) {
        // if is fetching then skip
        if (context.getters[PREFIX + '.detail.fetching']) {
          return;
        }
        return new Promise((resolve) => {
          context.commit(PREFIX + '.detail.set-fetching', true);
          tomoni[SERVICE][RESOURCE].get(id, context.state[PREFIX_STATE + '_detail_query'])
            .then(({ data }) => {
              context.commit(PREFIX + '.detail.set-detail', data)
              context.commit(PREFIX + '.detail.set-fetching', false);
              resolve(data)
            }).catch(({ response }) => {
              context.commit(PREFIX + '.detail.set-fetching', false);
              context.dispatch('errors.push-http-error', response);
            });
        });
      },
      [PREFIX + '.detail.update'](context, attributes) {
        return new Promise((resolve) => {
          context.commit(PREFIX + '.detail.set-updating', true);
          tomoni[SERVICE][RESOURCE].update(context.getters[PREFIX + '.detail.id'], attributes)
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
      [PREFIX + '.detail.delete'](context) {
        return new Promise((resolve) => {
          context.commit(PREFIX + '.detail.set-deleting', true);
          tomoni[SERVICE][RESOURCE].delete(context.getters[PREFIX + '.detail.id'])
            .then(({ data }) => {
              context.commit(PREFIX + '.detail.set-deleting', false);
              context.commit(PREFIX + '.delete', { id: context.getters[PREFIX + '.detail.id'], data });
              context.commit("toasts.push", {
                message: "Created",
                type: "success",
              });
              resolve(data)
            }).catch(({ response }) => {
              context.commit(PREFIX + '.detail.set-deleting', false);
              context.dispatch('errors.push-http-error', response);
            });
        });
      },
    }
  }
}
