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
};

const mutations = {
  ['order.purchases.set-list'](state, users) {
    state.order_purchases_list = users;
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
  ['order.purchases.detail.set-selected'](state, purchase) {
    state.order_purchases_detail_selected = purchase;
  },
  ['order.purchases.detail.items.push'](state, item) {
    state.order_purchases_detail_selected.items.push(item);
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
