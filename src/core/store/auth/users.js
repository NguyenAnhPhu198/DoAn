import tomoni from '../../services/tomoni'

const state = {
  auth_users_list: [],
  auth_users_paginate: {
    current: 1,
    last: 1,
    per: 15,
  },
  auth_users_fetching: false,
  auth_users_default_query: {
    with: "status;role",
    orderBy: "created_at",
    sortedBy: "desc",
  },
  auth_users_query: {},
};

const getters = {
  ['auth.users.list'](state) {
    return state.auth_users_list;
  },
  ['auth.users.paginate'](state) {
    return state.auth_users_paginate;
  },
  ['auth.users.fetching'](state) {
    return state.auth_users_fetching;
  },
  ['auth.users.query'](state) {
    return {
      ...state.auth_users_default_query,
      ...state.auth_users_query,
    };
  }
};

const actions = {
  ['auth.users.fetch'](context) {
    // if is fetching then skip
    if (context.getters['auth.users.fetching']) {
      return;
    }
    return new Promise((resolve) => {
      context.commit('auth.users.set-fetching', true);
      tomoni.auth.users
        .all(context.getters['auth.users.query'])
        .then(({ data }) => {
          context.commit('auth.users.set-list', data.data)
          context.commit('auth.users.set-paginate', data)
          context.commit('auth.users.set-fetching', false);
          resolve(data)
        }).catch(({ response }) => {
          context.commit('auth.users.set-fetching', false);
          context.dispatch('errors.push-http-error', response);
        });
    });
  },
  ['auth.users.change-page'](context, page) {
    context.commit('auth.users.push-query', { page })
    context.dispatch('auth.users.fetch')
  },
  ['auth.users.push-query'](context, query) {
    context.commit('auth.users.push-query', query)
    context.dispatch('auth.users.fetch')
  },
  ['auth.users.apply-query'](context, query) {
    context.commit('auth.users.reset-query')
    context.commit('auth.users.push-query', query)
    context.dispatch('auth.users.fetch')
  },
};

const mutations = {
  ['auth.users.set-list'](state, users) {
    state.auth_users_list = users;
  },
  ['auth.users.set-fetching'](state, fetching) {
    state.auth_users_fetching = fetching;
  },
  ['auth.users.set-paginate'](state, { current_page, last_page, per_page }) {
    state.auth_users_paginate = {
      current: current_page,
      last: last_page,
      per: per_page
    }
  },
  ['auth.users.push-query'](state, query) {
    state.auth_users_query = { ...state.auth_users_query, ...query }
  },
  ['auth.users.reset-query'](state) {
    state.auth_users_query = {}
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
