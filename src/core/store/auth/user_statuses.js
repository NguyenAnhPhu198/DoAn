import tomoni from '../../services/tomoni'

const state = {
  auth_user_statuses_list: [],
  auth_user_statuses_loading: false,
  auth_user_statuses_default_query: {},
  auth_user_statuses_query: {},
};

const getters = {
  ['auth.user_statuses.list'](state) {
    return state.auth_user_statuses_list;
  },
  ['auth.user_statuses.loading'](state) {
    return state.auth_user_statuses_loading;
  },
  ['auth.user_statuses.query'](state) {
    return {
      ...state.auth_user_statuses_default_query,
      ...state.auth_user_statuses_query,
    };
  }
};

const actions = {
  ['auth.user_statuses.fetch'](context) {
    // if is loading then skip
    if (context.getters['auth.user_statuses.loading']) {
      return;
    }
    return new Promise((resolve) => {
      context.commit('auth.user_statuses.set-loading', true);
      tomoni.auth['user-statuses']
        .all(context.getters['auth.user_statuses.query'])
        .then(({ data }) => {
          context.commit('auth.user_statuses.set-list', data)
          context.commit('auth.user_statuses.set-loading', false);
          resolve(data)
        }).catch(({ response }) => {
          context.commit('auth.user_statuses.set-loading', false);
          context.dispatch('errors.push-http-error', response);
        });
    });
  },
  ['auth.user_statuses.push-query'](context, query) {
    context.commit('auth.user_statuses.push-query', query)
    context.dispatch('auth.user_statuses.fetch')
  },
  ['auth.user_statuses.apply-query'](context, query) {
    context.commit('auth.user_statuses.reset-query')
    context.commit('auth.user_statuses.push-query', query)
    context.dispatch('auth.user_statuses.fetch')
  },
};

const mutations = {
  ['auth.user_statuses.set-list'](state, statuses) {
    state.auth_user_statuses_list = statuses;
  },
  ['auth.user_statuses.set-loading'](state, loading) {
    state.auth_user_statuses_loading = loading;
  },
  ['auth.user_statuses.push-query'](state, query) {
    state.auth_user_statuses_query = { ...state.auth_user_statuses_query, ...query }
  },
  ['auth.user_statuses.reset-query'](state) {
    state.auth_user_statuses_query = {}
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
