import firebase from "@/core/plugins/firebase";
import facebook from "./facebook";
import google from "./google";
import password from "./password";

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

const onAuthStateChanged = callback => {
  return firebase.auth().onAuthStateChanged(callback)
}

const sendPasswordResetEmail = email => {
  return firebase.auth().sendPasswordResetEmail(email)
}

const updateEmail = ({ current_email, new_email, password }) => {
  return new Promise((resolve, reject) => {
    var credential = firebase.auth.EmailAuthProvider.credential(current_email, password);
    return currentUser().reauthenticateWithCredential(credential)
      .then(function() {
        currentUser().updateEmail(new_email)
          .then(() => {
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      })
      .catch(function(error) {
        reject(error);
      });
  });
};

const sendEmailVerify = () => {
  return currentUser().sendEmailVerification()
}

export default {
  facebook,
  google,
  password,
  updateEmail,
  getIdToken,
  sendEmailVerify,
  currentUser,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail
}
