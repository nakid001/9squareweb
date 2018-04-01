import * as firebase from 'firebase'
let provider = new firebase.auth.GoogleAuthProvider()
function Success (username) {
  alert(username)
  document.cookie = 'username=' + username + '; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/examiner'
  document.cookie = 'examiner=' + username + '; expires=Thu, 18 Dec 2018 12:00:00 UTC; path=/examiner'
  window.location = '/examiner'
}
export function regisfire(username, password) {
  firebase.auth().createUserWithEmailAndPassword(username, password).then(() => {
    firebase.database().ref('examiners/' + firebase.auth().currentUser.uid).set({
      email: username,
      // profile_picture : imageUrl
    }).then(()=> {
      Success(username)      
    })
  }).catch((error) => {
    let errorCode = error.code
    let errorMessage = error.message
    alert(errorCode + errorMessage)
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

export function getid (id) {
  return {
    type: 'GETID',
    Ipayload: id,
    payload: 'GET ID'
  }
}
export function gethistory (arr) {
  return {
    type: 'GETHIS',
    Hpayload: arr,
    payload: 'GET HISTORY'
  }
}

export function setDate (date) {
  return {
    type : 'SETDATE',
    Dpayload: date,
    payload: 'SET DATE FOR HISTORY'
  }
}
export function clearDate () {
  return {
    type: 'CLEARDATE',
    payload: 'CLEAR DATE IN HISTORY'
  }
}