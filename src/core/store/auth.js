import redirects from '../redirects'
import tomoni from '../services/tomoni'

// resource constants
const LOCKED_ID = 'locked';

const state = {
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
  }
};

const actions = {
  ['auth.fetch_access_token'](context, payload) {
    return tomoni.auth.auth.getAccessToken(payload).then(({ data }) => {
      context.commit('auth.set_token', data.access_token)
      return data
    })
  },
  ['auth.logout'](context) {
    context.commit('auth.purge');
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
    }).catch(() => {
      context.commit('auth.purge')
    })
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
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};
