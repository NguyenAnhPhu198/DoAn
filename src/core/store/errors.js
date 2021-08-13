import { ERROR } from "./toasts";

const state = {
  errors_list: []
};

const getters = {
  ['errors.list'](state) {
    return state.errors_list;
  },
}

const actions = {
  ['errors.notify'](context, error) {
    context.commit('toasts.push', {
      title: error.type || error.status || error.code,
      message: error.message,
      type: ERROR,
    })
  },
  ['errors.push-http-error'](context, error) {
    const response = error.response
    if (response) {
      context.dispatch('errors.push', {
        error: {
          type: response.data.error,
          message: response.data.errors?.message || response.data.message,
          code: response.status,
          status: response.statusText,
        },
        notify: true,
      })
    } else {
      context.dispatch('errors.push', {
        error: {
          message: error.message,
        },
        notify: true,
      })
    }
  },
  ['errors.push'](context, { error, notify = false }) {
    context.commit('errors.push', error)
    if (notify) {
      context.dispatch('errors.notify', error)
    }
  },
};

const mutations = {
  ['errors.push'](state, { type, message, code, status }) {
    state.errors_list.push({
      type,
      message,
      code,
      status,
    });
  },
  ['errors.clear'](state) {
    state.errors_list = []
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
