import tomoni from "../services/tomoni";
import firebaseAuth from "../services/firebase/auth";

const state = {
  auth_me: {}
};

const getters = {
  ["auth.me"](state) {
    return state.auth_me;
  },
  ["auth.me.id"](state) {
    return state.auth_me.id;
  },
  ["auth.me.permission_ids"](state) {
    return state.auth_me.permission_ids;
  },
  ["auth.me.manage_user_ids"](state) {
    return state.auth_me.manage_user_ids;
  },
  ["auth.authenticated"](state) {
    return state.auth_me.id;
  }
};

const actions = {
  ["auth.login.password"](context, { email, password }) {
    return new Promise(resolve => {
      // - set loading true
      firebaseAuth.password
        .login(email, password)
        .then(() => {
          toastIDToken(context);
          context.dispatch("auth.me.fetch").then(me => resolve(me));
        })
        .catch(error => {
          context.dispatch("errors.push", {
            error,
            notify: true
          });
        })
        .finally(() => {
          // - set loading false
        });
    });
  },
  ["auth.login.social"](context, provider) {
    return new Promise(resolve => {
      // - set loading true
      firebaseAuth[provider]
        .login()
        .then(() => {
          toastIDToken(context);
          context.dispatch("auth.me.fetch").then(me => resolve(me));
        })
        .catch(error => {
          context.dispatch("errors.push", {
            error,
            notify: true
          });
        })
        .finally(() => {
          // - set loading false
        });
    });
  },
  ["auth.me.fetch"](context) {
    return new Promise((resolve, reject) => {
      tomoni.auth.auth
        .me({
          appends: "manageUserIds;permissionIds"
        })
        .then(({ data }) => {
          const me = {
            id: data.id,
            email: data.email,
            role_id: data.role_id,
            email_verified: data.email_verified,
            permission_ids: data.permission_ids,
            manage_user_ids: data.manage_user_ids
          };
          context.commit("auth.me.set", me);
          resolve(me);
        })
        .catch(error => {
          context.dispatch("errors.push-http-error", error);
          reject(error);
        });
    });
  },
  ["auth.logout"](context) {
    return firebaseAuth.signOut().then(() => {
      context.commit("auth.me.purge");
    });
  },
  ["auth.me.send_mail.verification"](context) {
    return new Promise((resolve, reject) => {
      firebaseAuth.currentUser().sendEmailVerification().then(() => {
        context.commit("toasts.push", {
          title: "Verification email sent",
          message: "Check your mail",
          type: "success"
        });
        resolve();
      }).catch(error => {
        context.dispatch("errors.push", {
          error,
          notify: true
        });
        reject(error);
      });
    });
  },
  ["auth.me.update_email"](context, email) {
    return new Promise((resolve, reject) => {
      firebaseAuth.currentUser()
        .updateEmail(email)
        .then(() => {
          context.dispatch("auth.me.send_mail.verification");
          context.dispatch("auth.me.fetch");
          resolve();
        })
        .catch(error => {
          context.dispatch("errors.push", {
            error,
            notify: true
          });
          reject(error);
        });
    });
  },
  ["auth.me.send_mail.reset_password"](context) {
    return new Promise((resolve, reject) => {
      const email = context.getters['auth.me'].email;
      if (!email) {
        const error = {
          message: 'Email empty',
        }
        context.dispatch("errors.push", {
          error: error,
          notify: true
        });
        reject(error)
      }
      firebaseAuth
        .sendPasswordResetEmail(email)
        .then(() => {
          context.commit("toasts.push", {
            title: "Password reset email sent",
            message: "Check your mail",
            type: "success"
          });
          resolve();
        })
        .catch(error => {
          context.dispatch("errors.push", {
            error,
            notify: true
          });
          reject(error);
        });
    });
  },
  ["auth.verify"](context, requireVerification = false) {
    return new Promise((resolve, reject) => {
      context.dispatch('auth.authenticate').then((me) => {
        if (requireVerification) {
          if (me.email_verified) {
            resolve(me)
          }
          reject({
            code: 403,
            type: 'email_not_verified',
            message: 'Email not verified',
          })
        }
        resolve(1)
      }).catch(error => {
        reject(error)
      })
    })
  },
  ["auth.authenticate"](context) {
    if (context.getters['auth.authenticated']) {
      return context.getters['auth.me']
    }
    var unsubscribe
    return new Promise((resolve, reject) => {
      unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        if (!user) {
          reject({
            code: 401,
            type: 'logged_out',
            message: 'Logged out',
          })
          return
        }
        context.dispatch('auth.me.fetch').then((me) => {
          resolve(me)
        })
      })
    }).finally(() => {
      unsubscribe()
    })
  },
  ["auth.me.idtoken.toast"](context) {
    toastIDToken(context);
  }
};

const mutations = {
  ["auth.me.set"](state, user) {
    state.auth_me = user;
  },
  ["auth.me.purge"](state) {
    state.auth_me = {
      email_verified: false,
      permission_ids: [],
      manage_user_ids: []
    };
  }
};

async function toastIDToken(context) {
  context.commit("toasts.push", {
    title: "ID Token",
    message: await firebaseAuth.getIdToken(),
    type: "success"
  });
}

export default {
  state,
  actions,
  mutations,
  getters
};
