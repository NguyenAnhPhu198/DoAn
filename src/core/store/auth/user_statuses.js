import tomoni from '../../services/tomoni'

const state = {
  auth_user_statuses_list: [],
  auth_user_statuses_fetching: false,
  auth_user_statuses_default_query: {},
  auth_user_statuses_query: {},
};

const getters = {
  ['auth.user_statuses.list'](state) {
    return state.auth_user_statuses_list;
  },
  ['auth.user_statuses.fetching'](state) {
    return state.auth_user_statuses_fetching;
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
    // if is fetching then skip
    if (context.getters['auth.user_statuses.fetching']) {
      return;
    }
    return new Promise((resolve) => {
      context.commit('auth.user_statuses.set-fetching', true);
      tomoni.auth['user-statuses']
        .all(context.getters['auth.user_statuses.query'])
        .then(({ data }) => {
          context.commit('auth.user_statuses.set-list', data)
          context.commit('auth.user_statuses.set-fetching', false);
          resolve(data)
        }).catch(({ response }) => {
          context.commit('auth.user_statuses.set-fetching', false);
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
  ['auth.user_statuses.set-fetching'](state, fetching) {
    state.auth_user_statuses_fetching = fetching;
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
