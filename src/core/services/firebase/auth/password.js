import firebase from '../../../plugins/firebase'

export default {
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }
}
