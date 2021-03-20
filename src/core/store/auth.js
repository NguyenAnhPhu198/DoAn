// import redirects from '../redirects'

// resource constants
const LOCKED_ID = 'locked';

const state = {
  auth_user: {},
  auth_authenticated: true,
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
  ['auth.locked'](state){
    return state.auth_user.status_id == LOCKED_ID;
  }
};

const actions = {
  ['auth.fetch_access_token']() {
    return new Promise();
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
  ['auth.verify']() {

  },
};

const mutations = {
  ['auth.set_token'](state) {
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
