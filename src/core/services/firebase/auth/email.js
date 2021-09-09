import firebase from '../../../plugins/firebase'

const updateEmail = (email) => {
  const user = firebase.auth().currentUser;
  return user.updateEmail(email)
}

const sendEmailVerify = () => {
  firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      // Email verification sent!
      // ...
    })
}

export default {
  updateEmail,
  sendEmailVerify
}
