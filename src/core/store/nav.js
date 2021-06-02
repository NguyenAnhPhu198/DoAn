import lodash from "@/core/plugins/lodash";

const state = {
  nav_items: [],
  nav_available_items: [],
  nav_selected: {},
}

const getters = {
  ['nav.structure'](state) {
    return [
      {
        _name: 'CSidebarNav',
        _children: state.nav_available_items,
      }
    ];
  },
  ['nav.items'](state) {
    return state.nav_items;
  },
  ['nav.selected'](state) {
    return state.nav_selected;
  },
}

const actions = {
  ['nav.push'](context, items) {
    context.commit('nav.push', items);
    context.dispatch('nav.available.refresh');
  },
  ['nav.set'](context, items) {
    context.commit('nav.set', items);
    context.dispatch('nav.available.refresh');
  },
  ['nav.available.refresh'](context) {
    const items = context.getters["nav.items"].filter((i) => {
      if (i.permissions) {
        return lodash.hasAll(
          context.getters["auth.flatten_permissions"],
          i.permissions
        );
      }
      if (i.any_permissions) {
        return lodash.hasAny(
          context.getters["auth.flatten_permissions"],
          i.any_permissions
        );
      }
      return true;
    });

    context.commit('nav.available.set', items);
  },
}

const mutations = {
  ['nav.push'](state, items) {
    state.nav_items.push(...items);
  },
  ['nav.set'](state, items) {
    state.nav_items = items;
  },
  ['nav.available.set'](state, items) {
    state.nav_available_items = items;
  },
  ['nav.clear'](state) {
    state.nav_items = [];
    state.nav_available_items = [];
  },
  ['nav.select'](state, route) {
    let item = null

    state.nav_items.forEach(i => {
      if (i.items) {
        item = i.items.find(subitem => {
          return lodash.startsWith(route, subitem.to)
        })
      }
    })

    if (!item) {
      item = state.nav_items.find((i) => {
        return lodash.startsWith(route, i.to)
      })
    }

    state.nav_selected = item;
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}
