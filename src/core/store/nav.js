import lodash from "lodash";

const state = {
  nav_list: [
    {
      _name: 'CSidebarNav',
      _children: []
    }
  ],
  nav_selected: {},
}

const getters = {
  ['nav.list'](state) {
    /**
     * - translate "name"
     */
    return state.nav_list;
  },
  ['nav.selected'](state) {
    return state.nav_selected;
  },
}

const actions = {
  ['nav.push'](context, items) {
    context.commit('nav.push', items);
  },
  ['nav.fresh'](context) {
    context.commit('nav.fresh');
  },
  ['nav.select'](context, route) {
    let item = null

    context.state.nav_list[0]._children.forEach(i => {
      if (i.items) {
        item = i.items.find(subitem => {
          return lodash.startsWith(route, subitem.to)
        })
      }
    })

    if (!item) {
      item = context.state.nav_list[0]._children.find((i) => {
        return lodash.startsWith(route, i.to)
      })
    }

    context.commit('nav.select', item);
  },
}

const mutations = {
  ['nav.push'](state, items) {
    state.nav_list[0]._children.push(...items);
  },
  ['nav.fresh'](state) {
    state.nav_list[0]._children = [];
  },
  ['nav.select'](state, item) {
    state.nav_selected = item;
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}
