import redirects from '../redirects'
import tomoni from '../services/tomoni'

// resource constants
const LOCKED_ID = 'locked';

const state = {
  auth_flatten_permissions: [],
  auth_user: {},
  auth_authenticated: !!tomoni['token.local'].get(),
};

const getters = {
  ['auth.user'](state) {
    return state.auth_user;
  },
  ['auth.authenticated'](state) {
    return state.auth_authenticated;
  },
  ['auth.email_verified'](state) {
    return !!state.auth_user.email_verified_at;
  },
  ['auth.locked'](state) {
    return state.auth_user.status_id == LOCKED_ID;
  },
  ['auth.flatten_permissions'](state) {
    return state.auth_flatten_permissions.map(p => p.id);
  },
};

const actions = {
  ['auth.fetch_access_token'](context, payload) {
    return new Promise((resolve, reject) => {
      tomoni.auth.auth.getAccessToken(payload).then(({ data }) => {
        context.commit('auth.set_token', data.access_token)
        resolve(data)
      }).catch(({ response }) => {
        context.dispatch('errors.push-http-error', response)
        reject(response)
      })
    });
  },
  ['auth.logout'](context) {
    context.commit('auth.purge');
    return tomoni.auth.auth.logout()
  },
  ['auth.register']() {
    return new Promise();
  },
  ['auth.resent_mail_verification']() {

  },
  ['auth.verify_email']() {

  },
  ['auth.send_mail_reset_password']() {

  },
  ['auth.reset_password']() {

  },
  ['auth.verify'](context) {
    return new Promise((resolve, reject) => {
      tomoni.auth.auth.me().then(({ data }) => {
        context.commit('auth.set_user', data)

        // If email not verified then redirect to verify
        if (!context.getters['auth.email_verified']) {
          redirects.auth.toEmailUnverified()
        }

        // If this auth has been locked then redirect to login
        if (context.getters['auth.locked']) {
          redirects.auth.toLogin()
        }

        resolve(data)
      }).catch(({ response }) => {
        context.dispatch('errors.push-http-error', response)
        context.commit('auth.purge')
        return reject(response)
      })
    })
  },
  ['auth.flatten_permissions.fetch'](context) {
    return new Promise((resolve) => {
      tomoni.auth.auth.flattenPermissions()
        .then(({ data }) => {
          context.commit('auth.set_flatten_permissions', data);
          resolve(data)
        }).catch(({ response }) => {
          context.dispatch('errors.push-http-error', response);
        });
    });
  },
};

const mutations = {
  ['auth.set_token'](state, token) {
    tomoni['token.local'].set(token);
    state.auth_authenticated = true;
  },
  ['auth.set_user'](state, user) {
    state.auth_authenticated = true;
    state.auth_user = user;
  },
  ['auth.purge'](state) {
    state.auth_authenticated = false;
    state.auth_user = {};
  },
  ['auth.set_flatten_permissions'](state, permissions) {
    state.auth_flatten_permissions = permissions;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
