import tomoni from '@/core/services/tomoni'

const state = {
  order_purchases_list: [],
  order_purchases_paginate: {
    current: 1,
    last: 1,
    per: 15,
  },
  order_purchases_loading: false,
  order_purchases_default_query: {
    with: "items",
    appends: "supplier",
    orderBy: "created_at",
    sortedBy: "desc",
    searchJoin: 'and',
  },
  order_purchases_query: {},
  order_purchases_detail_selected: {
    id: null,
    supplier_id: null,
    buyer_id: null,
    expected_delivery: null,
    payment_due_date: null,
    additional_cost: 0,
    created_at: null,
    updated_at: null,
    balance: 0,
    items: [],
    receipts: [],
    status: {
      id: null,
      name: null,
    },
    type: {
      id: null,
      name: null
    },
    steps: []
  },
  order_purchases_detail_query: {
    with: "items;receipts",
    appends: "supplier",
  },
  order_purchases_detail_loading: false,
  order_purchases_detail_updating: false,
};

const getters = {
  ['order.purchases.list'](state) {
    return state.order_purchases_list;
  },
  ['order.purchases.paginate'](state) {
    return state.order_purchases_paginate;
  },
  ['order.purchases.loading'](state) {
    return state.order_purchases_loading;
  },
  ['order.purchases.query'](state) {
    return {
      ...state.order_purchases_default_query,
      ...state.order_purchases_query,
    };
  },
  ['order.purchases.detail.selected'](state) {
    return state.order_purchases_detail_selected;
  },
  ['order.purchases.detail.loading'](state) {
    return state.order_purchases_detail_loading;
  },
  ['order.purchases.detail.updating'](state) {
    return state.order_purchases_detail_updating;
  },
};

const actions = {
  ['order.purchases.fetch'](context) {
    // if is loading then skip
    if (context.getters['order.purchases.loading']) {
      return;
    }
    return new Promise((resolve) => {
      context.commit('order.purchases.set-loading', true);
      tomoni.order.purchases
        .all(context.getters['order.purchases.query'])
        .then(({ data }) => {
          context.commit('order.purchases.set-list', data.data)
          context.commit('order.purchases.set-paginate', data)
          context.commit('order.purchases.set-loading', false);
          resolve(data)
        }).catch(({ response }) => {
          context.commit('order.purchases.set-loading', false);
          context.dispatch('errors.push-http-error', response);
        });
    });
  },
  ['order.purchases.fetch.if-first-time'](context) {
    if (context.getters['order.purchases.list'].length) {
      return;
    }
    return context.dispatch('order.purchases.fetch');
  },
  ['order.purchases.change-page'](context, page) {
    context.commit('order.purchases.push-query', { page })
    context.dispatch('order.purchases.fetch')
  },
  ['order.purchases.push-query'](context, query) {
    context.commit('order.purchases.push-query', query)
    context.dispatch('order.purchases.fetch')
  },
  ['order.purchases.apply-query'](context, query) {
    context.commit('order.purchases.reset-query')
    context.commit('order.purchases.push-query', query)
    context.dispatch('order.purchases.fetch')
  },
  ['order.purchases.detail.select'](context, id) {
    // if is loading then skip
    if (context.getters['order.purchases.detail.loading']) {
      return;
    }
    return new Promise((resolve) => {
      context.commit('order.purchases.detail.set-loading', true);
      tomoni.order.purchases.get(id, context.state.order_purchases_detail_query)
        .then(({ data }) => {
          context.commit('order.purchases.detail.set-selected', data)
          context.commit('order.purchases.detail.set-loading', false);
          resolve(data)
        }).catch(({ response }) => {
          context.commit('order.purchases.detail.set-loading', false);
          context.dispatch('errors.push-http-error', response);
        });
    });
  },
  ['order.purchases.detail.update'](context, attributes) {
    return new Promise((resolve) => {
      context.commit('order.purchases.detail.set-updating', true);
      tomoni.order.purchases.update(context.state.order_purchases_detail_selected.id, attributes)
        .then(({ data }) => {
          context.commit('order.purchases.detail.set-updating', false);
          context.commit('order.purchases.detail.merge', data)
          context.commit("toasts.push", {
            message: "Updated",
            type: "success",
          });
          resolve(data)
        }).catch(({ response }) => {
          context.commit('order.purchases.detail.set-updating', false);
          context.dispatch('errors.push-http-error', response);
        });
    });
  },
  ['order.purchases.detail.items.update'](context, { id, attributes }) {
    return new Promise((resolve) => {
      tomoni.order.purchase_items.update(id, attributes)
        .then(({ data }) => {
          context.commit('order.purchases.detail.items.merge', { id, data })
          context.commit("toasts.push", {
            message: "Updated",
            type: "success",
          });
          resolve(data)
        }).catch(({ response }) => {
          context.dispatch('errors.push-http-error', response);
        });
    });
  },
  ['order.purchases.detail.items.delete'](context, id) {
    return new Promise((resolve) => {
      tomoni.order.purchase_items.delete(id)
        .then(({ data }) => {
          context.commit('order.purchases.detail.items.remove', id)
          context.commit("toasts.push", {
            message: "Deleted",
            type: "success",
          });
          resolve(data)
        }).catch(({ response }) => {
          context.dispatch('errors.push-http-error', response);
        });
    });
  },
};

const mutations = {
  ['order.purchases.set-list'](state, list) {
    state.order_purchases_list = list;
  },
  ['order.purchases.set-loading'](state, loading) {
    state.order_purchases_loading = loading;
  },
  ['order.purchases.set-paginate'](state, { current_page, last_page, per_page }) {
    state.order_purchases_paginate = {
      current: current_page,
      last: last_page,
      per: per_page
    }
  },
  ['order.purchases.push-query'](state, query) {
    state.order_purchases_query = { ...state.order_purchases_query, ...query }
  },
  ['order.purchases.reset-query'](state) {
    state.order_purchases_query = {}
  },
  ['order.purchases.detail.set-loading'](state, loading) {
    state.order_purchases_detail_loading = loading;
  },
  ['order.purchases.detail.set-updating'](state, loading) {
    state.order_purchases_detail_updating = loading;
  },
  ['order.purchases.detail.set-selected'](state, purchase) {
    state.order_purchases_detail_selected = purchase;
  },
  ['order.purchases.detail.merge'](state, purchase) {
    state.order_purchases_detail_selected = { ...state.order_purchases_detail_selected, ...purchase }

    // update item in list
    state.order_purchases_list = state.order_purchases_list.map((item) => {
      if (item.id == purchase.id) {
        item = { ...item, ...purchase }
      }
      return item
    })
  },
  ['order.purchases.detail.items.push'](state, item) {
    state.order_purchases_detail_selected.items.push(item);
  },
  ['order.purchases.detail.items.remove'](state, item_id) {
    let deleteIndex = state.order_purchases_detail_selected.items.findIndex((item) => item.id == item_id)
    state.order_purchases_detail_selected.items.splice(deleteIndex, 1)
  },
  ['order.purchases.detail.items.merge'](state, { id, data }) {
    state.order_purchases_detail_selected.items = state.order_purchases_detail_selected.items.map((item) => {
      if (item.id == id) {
        item = data
      }
      return item
    })

    // update detail
    if (data.purchase) {
      this.commit('order.purchases.detail.merge', data.purchase)
    }
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
