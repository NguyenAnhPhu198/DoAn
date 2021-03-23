import router from '../router'

export default {
  /*
   * to({path}){
   *     window.location.href = process.env.VUE_APP_URL + path
   * },
   */
  to(params) {
    router.push(params);
  },
  toLogin() {
    this.to({ path: '/login' });
  },
  toEmailUnverified() {
    this.to({ path: '/email-unverified' });
  },
  toHome() {
    this.to({ path: '/' });
  },
}