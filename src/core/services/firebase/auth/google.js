import firebase from '../../../plugins/firebase'

export default {
  login() {
    var provider = new firebase.auth.GoogleAuthProvider()

    return firebase.auth().signInWithPopup(provider)
  }
}
