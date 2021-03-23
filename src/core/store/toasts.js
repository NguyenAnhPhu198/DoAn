// types | colors
export const SUCCESS = "success";
export const ERROR = "danger";
export const WARNING = "warning";
export const MESSAGE = "dark";

const state = {
  toasts_list: [],
  toasts_timeout: 5000,
};

const getters = {
  ['toasts.timeout'](state) {
    return state.toasts_timeout;
  },
  ['toasts.list'](state) {
    return state.toasts_list;
  },
}

const actions = {

};

const mutations = {
  ['toasts.push'](state, { title, message, type }) {
    state.toasts_list.push({
      title,
      message,
      type,
    });
  },
  ['toasts.clear'](state) {
    state.toasts_list = []
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
