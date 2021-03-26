import tomoni from '../../services/tomoni'

const state = {
  auth_roles_list: [],
  auth_roles_loading: false,
  auth_roles_default_query: {
    with: 'fullChilds',
  },
  auth_roles_query: {},
};

const getters = {
  ['auth.roles.list'](state) {
    return state.auth_roles_list;
  },
  ['auth.roles.loading'](state) {
    return state.auth_roles_loading;
  },
  ['auth.roles.query'](state) {
    return {
      ...state.auth_roles_default_query,
      ...state.auth_roles_query,
    };
  }
};

const actions = {
  ['auth.roles.fetch'](context) {
    // if is loading then skip
    if (context.getters['auth.roles.loading']) {
      return;
    }
    return new Promise((resolve) => {
      context.commit('auth.roles.set-loading', true);
      tomoni.auth.roles
        .all(context.getters['auth.roles.query'])
        .then(({ data }) => {
          context.commit('auth.roles.set-list', data)
          context.commit('auth.roles.set-loading', false);
          resolve(data)
        }).catch(({ response }) => {
          context.commit('auth.roles.set-loading', false);
          context.dispatch('errors.push-http-error', response);
        });
    });
  },
  ['auth.roles.push-query'](context, query) {
    context.commit('auth.roles.push-query', query)
    context.dispatch('auth.roles.fetch')
  },
  ['auth.roles.apply-query'](context, query) {
    context.commit('auth.roles.reset-query')
    context.commit('auth.roles.push-query', query)
    context.dispatch('auth.roles.fetch')
  },
};

const mutations = {
  ['auth.roles.set-list'](state, roles) {
    state.auth_roles_list = roles;
  },
  ['auth.roles.set-loading'](state, loading) {
    state.auth_roles_loading = loading;
  },
  ['auth.roles.push-query'](state, query) {
    state.auth_roles_query = { ...state.auth_roles_query, ...query }
  },
  ['auth.roles.reset-query'](state) {
    state.auth_roles_query = {}
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
