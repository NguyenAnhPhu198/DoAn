import tomoni from '@/core/services/tomoni'

const state = {
  order_statuses_list: [],
  order_statuses_loading: false,
  order_statuses_default_query: {},
  order_statuses_query: {},
};

const getters = {
  ['order.statuses.list'](state) {
    return state.order_statuses_list;
  },
  ['order.statuses.loading'](state) {
    return state.order_statuses_loading;
  },
  ['order.statuses.query'](state) {
    return {
      ...state.order_statuses_default_query,
      ...state.order_statuses_query,
    };
  },
};

const actions = {
  ['order.statuses.fetch'](context) {
    // if is loading then skip
    if (context.getters['order.statuses.loading']) {
      return;
    }
    return new Promise((resolve) => {
      context.commit('order.statuses.set-loading', true);
      tomoni.order.statuses
        .all(context.getters['order.statuses.query'])
        .then(({ data }) => {
          context.commit('order.statuses.set-list', data)
          context.commit('order.statuses.set-loading', false);
          resolve(data)
        }).catch(({ response }) => {
          context.commit('order.statuses.set-loading', false);
          context.dispatch('errors.push-http-error', response);
        });
    });
  },
  ['order.statuses.fetch.if-first-time'](context) {
    if (context.getters['order.statuses.list'].length) {
      return;
    }
    return context.dispatch('order.statuses.fetch');
  },
  ['order.statuses.push-query'](context, query) {
    context.commit('order.statuses.push-query', query)
    context.dispatch('order.statuses.fetch')
  },
  ['order.statuses.apply-query'](context, query) {
    context.commit('order.statuses.reset-query')
    context.commit('order.statuses.push-query', query)
    context.dispatch('order.statuses.fetch')
  },
};

const mutations = {
  ['order.statuses.set-list'](state, list) {
    state.order_statuses_list = list;
  },
  ['order.statuses.set-loading'](state, loading) {
    state.order_statuses_loading = loading;
  },
  ['order.statuses.push-query'](state, query) {
    state.order_statuses_query = { ...state.order_statuses_query, ...query }
  },
  ['order.statuses.reset-query'](state) {
    state.order_statuses_query = {}
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
