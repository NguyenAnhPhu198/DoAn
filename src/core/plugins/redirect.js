import router from '../router'
import redirect from '@/config/redirect'

export default {
  /*
   * to({path}){
   *     window.location.href = process.env.VUE_APP_URL + path
   * },
   */
  to(params) {
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
  toEmailUnverified() {
    this.to({ path: '/email-unverified' });
  },
  toHome() {
    this.to({ path: '/' });
  },

  /**
   * more
   */
  ...redirect,
}