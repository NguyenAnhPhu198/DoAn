import firebase from '../../../plugins/firebase'

export default {
  login() {
    var provider = new firebase.auth.FacebookAuthProvider()

    return firebase.auth().signInWithPopup(provider)
  }
}
