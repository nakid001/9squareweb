import * as firebase from 'firebase'
let provider = new firebase.auth.GoogleAuthProvider()
function Success (username) {
  alert(username)
  document.cookie = 'username=' + username + '; expires=Thu, 18 Dec 2018 12:00:00 UTC'
  window.location = '/'
}
export function regisfire(username, password) {
  firebase.auth().createUserWithEmailAndPassword(username, password).then(() => {
      Success(username, password)
  }).catch((error) => {
      let errorCode = error.code
      let errorMessage = error.message
      alert(error)
    })
  return {
    type: 'REGFIRE',
    payload: 'REGISTERING'
  }
}
export function loginfire (username, password) {
  firebase.auth().signInWithEmailAndPassword(username, password).then(() => {
    Success(username)
  }).catch((error) => {
    alert(error)
  })
  return {
    type: 'LOGFIRE',
    payload: 'LOGIN FIRE'
  }
}
