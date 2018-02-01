import * as firebase from 'firebase'
let provider = new firebase.auth.GoogleAuthProvider()
function Success (username) {
  alert(username)
  document.cookie = 'username=' + username + '; expires=Thu, 18 Dec 2018 12:00:00 UTC'
  window.location = '/'
}
export function regisfire(username, password) {
  firebase.auth().createUserWithEmailAndPassword(username, password).then(() => {
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
      email: username,
      // profile_picture : imageUrl
    }).then(()=> {
      Success(username, password)      
    })
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

export function logingmail () {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    Success(result.user.displayName)
    // ...
  }).catch(function(error) {
    alert(error)
  })
  return {
    type: 'LOGMAIL',
    payload: 'LOGIN GMAIL'
  }
}
export function gethistory (arr, username) {
  return {
    type: 'GETHIS',
    Hpayload: arr,
    Upayload: username,
    payload: 'GET HISTORY'
  }
}
export function getranking (arr, key, username) {

  return {
    type: 'GETRANK',
    Rpayload: arr,
    Kpayload: key,
    Upayload: username,
    payload: 'GET RANKING'
  }
}
export function canlogin (username) {
  return {
    type: 'CANLOG',
    Upayload: username,
    Lpayload: false
  }
}
export function cannotlogin () {
  return {
    type: 'CANNOTLOG',
    Lpayload: false
  }
}