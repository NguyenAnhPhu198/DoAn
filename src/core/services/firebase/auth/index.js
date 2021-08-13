import firebase from "@/core/plugins/firebase";
import facebook from './facebook'
import google from './google'
import password from './password'

const getIdToken = async () => {
  return await firebase.auth().currentUser.getIdToken()
}

const currentUser = () => {
  return firebase.auth().currentUser
}

const signOut = () => {
  return firebase.auth().signOut()
}

const onAuthStateChanged = (callback) => {
  return firebase.auth().onAuthStateChanged(callback)
}

export default {
  facebook,
  google,
  password,
  getIdToken,
  currentUser,
  signOut,
  onAuthStateChanged,
}