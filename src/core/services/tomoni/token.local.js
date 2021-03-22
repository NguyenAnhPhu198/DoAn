import VueCookie from "vue-cookie"

const ID_TOKEN_KEY = "access_token_tomoni"
const TOKEN_EXPIRES = 30; // day

export function sharedDomain() {
  // return (process.env.VUE_APP_DOMAIN.indexOf('.') > 0 ? '.' : '') + process.env.VUE_APP_DOMAIN
  return process.env.VUE_APP_DOMAIN
}

export const get = () => {
  return VueCookie.get(ID_TOKEN_KEY)
};

export const set = token => {
  VueCookie.set(ID_TOKEN_KEY, token, {
    expires: TOKEN_EXPIRES,
    domain: sharedDomain(),
  })
};

export const unset = () => {
  VueCookie.delete(ID_TOKEN_KEY, { domain: sharedDomain() })
};

export default { get, set, unset }
