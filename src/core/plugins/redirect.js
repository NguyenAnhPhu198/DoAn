import router from '../router'
import redirect from '@/mixins/redirect'

export default {
  /*
   * to({path}){
   *     window.location.href = process.env.VUE_APP_URL + path
   * },
   */
  to(params) {
    if (params.path && router.currentRoute.path == params.path) {
      return;
    }
    if (router.currentRoute.path == params) {
      return;
    }
    router.push(params);
  },

  /**
   * common
   */
  back() {
    router.back();
  },

  /**
   * auth
   */
  toLogin() {
    this.to({ path: '/login' });
  },
  toRegister() {
    this.to({ path: '/register' });
  },
  toEmailUnverified() {
    this.to({ path: '/email-unverified' });
  },
  toHome() {
    this.to({ path: '/' });
  },
  toForgotPassword() {
    this.to({ path: '/forgot-password' });
  },

  /**
   * more
   */
  ...redirect,
}