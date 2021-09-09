import firebase from '../../../plugins/firebase'

const updateEmail = ({
  current_email,
  new_email,
  password
}) => {

  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
      current_email,
      password,
    );
    return user.reauthenticateWithCredential(credential).then(function () {
      user.updateEmail(new_email).then(() => {
        resolve()
      }).catch((error) => {
        reject({
          field: 'password',
          message: error.message
        })
      });
    }).catch(function (error) {
      reject({
        field: 'password',
        message: error.message
      })

    });
  })
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
