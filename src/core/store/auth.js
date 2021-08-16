import tomoni from '../services/tomoni'
import firebaseAuth from '../services/firebase/auth'

const state = {
  auth_me: {},
};

const getters = {
  ['auth.me'](state) {
    return state.auth_me
  },
  ['auth.me.id'](state) {
    return state.auth_me.id
  },
  ['auth.me.permission_ids'](state) {
    return state.auth_me.permission_ids
  },
  ['auth.me.manage_user_ids'](state) {
    return state.auth_me.manage_user_ids
  },
  ['auth.authenticated'](state) {
    return state.auth_me.id
  },
};

const actions = {
  ['auth.login.password'](context, { email, password }) {
    return new Promise((resolve) => {
      // - set loading true
      firebaseAuth.password
        .login(email, password)
        .then(() => {
          toastIDToken(context);
          context.dispatch('auth.me.fetch').then((me) => resolve(me))
        }).catch((error) => {
          context.dispatch("errors.push", { error, notify: true });
        }).finally(() => {
          // - set loading false
        })
    })
  },
  ['auth.login.social'](context, provider) {
    return new Promise((resolve) => {
      // - set loading true
      firebaseAuth[provider]
        .login()
        .then(() => {
          toastIDToken(context);
          context.dispatch('auth.me.fetch').then((me) => resolve(me))
        }).catch((error) => {
          context.dispatch("errors.push", { error, notify: true });
        }).finally(() => {
          // - set loading false
        })
    })
  },
  ['auth.me.fetch'](context) {
    return new Promise((resolve, reject) => {
      tomoni.auth.auth.me({ appends: 'manageUserIds;permissionIds' }).then(({ data }) => {
        const user_logged_in = firebaseAuth.currentUser()
        const me = {
          id: data.id,
          email: data.email,
          role_id: data.role_id,
          email_verified: user_logged_in.emailVerified,
          permission_ids: data.permission_ids,
          manage_user_ids: data.manage_user_ids,
        }
        context.commit("auth.me.set", me);
        resolve(me);
      }).catch((error) => {
        context.dispatch('errors.push-http-error', error);
        reject(error)
      });
    })
  },
  ['auth.logout'](context) {
    return firebaseAuth.signOut().then(() => {
      context.commit('auth.me.purge');
    })
  },
  ['auth.reset_password'](context, email) {
    return new Promise((resolve, reject) => {
      firebaseAuth.sendPasswordResetEmail(email).then(() => {
        context.commit("toasts.push", {
          title: "Password reset email sent",
          message: "Check your mail",
          type: "success",
        })
        resolve()
      }).catch((error) => {
        context.dispatch("errors.push", { error, notify: true });
        reject(error)
      })
    })
  },
  ['auth.verify'](context) {
    var unsubscribe // stop listening auth change when it log out
    return new Promise((resolve, reject) => {
      unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        // not logged in
        if (!user) {
          reject({
            code: 401,
            type: 'logged_out',
            message: 'Logged out',
          })
        }
        // logged in & !authen
        if (!context.getters['auth.authenticated']) {
          context.dispatch('auth.me.fetch').then(() => {
            if (context.getters['auth.me'].email_verified) {
              resolve(1)
            }
            reject({
              code: 403,
              type: 'email_not_verified',
              message: 'Email not verified',
            })
          })
        } else {
          // logged in & authen
          if (context.getters['auth.me'].email_verified) {
            resolve(1)
          }
          reject({
            code: 403,
            type: 'email_not_verified',
            message: 'Email not verified',
          })
        }
      })
    }).then((result) => {
      unsubscribe()
      return result
    })
  },
  ['auth.me.idtoken.toast'](context) {
    toastIDToken(context)
  },
};

const mutations = {
  ['auth.me.set'](state, user) {
    state.auth_me = user;
  },
  ['auth.me.purge'](state) {
    state.auth_me = {
      email_verified: false,
      permission_ids: [],
      manage_user_ids: [],
    };
  },
};

async function toastIDToken(context) {
  context.commit("toasts.push", {
    title: "ID Token",
    message: await firebaseAuth.getIdToken(),
    type: "success",
  });
}

export default {
  state,
  actions,
  mutations,
  getters,
};
