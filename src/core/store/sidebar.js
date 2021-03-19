const state = {
  sidebar_show: 'responsive',
  sidebar_minimize: false,
  sidebar_aside_show: false,
  sidebar_dark_mode: false
}

const mutations = {
  ['sidebar.toggle_desktop'](state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebar_show)
    state.sidebar_show = sidebarOpened ? false : 'responsive'
  },
  ['sidebar.toggle_mobile'](state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebar_show)
    state.sidebar_show = sidebarClosed ? true : 'responsive'
  },
  ['sidebar.set'](state, [variable, value]) {
    state[variable] = value
  },
  ['sidebar.toggle'](state, variable) {
    state[variable] = !state[variable]
  }
}

export default {
  state,
  mutations,
};
