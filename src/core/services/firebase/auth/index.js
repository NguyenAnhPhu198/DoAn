import firebase from "@/core/plugins/firebase";
import facebook from './facebook'
import google from './google'
import password from './password'
import email from './email'

const currentUser = () => {
  return firebase.auth().currentUser
}

const getIdToken = async () => {
  if (!currentUser()) {
    return null;
  }
  return await currentUser().getIdToken()
}

const signOut = () => {
  return firebase.auth().signOut()
}

const onAuthStateChanged = (callback) => {
  return firebase.auth().onAuthStateChanged(callback)
}

const sendPasswordResetEmail = (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
}

export default {
  facebook,
  google,
  password,
  email,
  getIdToken,
  currentUser,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
}