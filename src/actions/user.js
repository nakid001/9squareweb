import * as firebase from 'firebase'
let provider = new firebase.auth.GoogleAuthProvider()
function Success (username) {
  document.cookie = 'username=' + username + '; expires=Thu, 18 Dec 2018 12:00:00 UTC'
  window.location = '/'
}
export function regisfire(username, password, repassword) {
  if(password === repassword) {
    firebase.auth().createUserWithEmailAndPassword(username, password).then(() => {
      firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
        email: username,
        test: {last_device: 'room1/device1'}
      // profile_picture : imageUrl
      }).then(()=> {
        Success(username, password)      
      })
    }).catch((error) => {
      let errorCode = error.code
      let errorMessage = error.message
      alert(errorMessage + errorCode)
    })
  } else {
    alert('password not match with repassword')
  }
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
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
      email: result.user.displayName,
      test: {last_device: 'room1/device1'}
    // profile_picture : imageUrl
    }).then(()=> {
      Success(result.user.displayName)
    })
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
export function addhistory () {
  let d = new Date()
  firebase.database().ref('/history/' + d.getFullYear() + '/' +('0' + d.getMonth()).slice(-2) + '/' +('0' + d.getDate()).slice(-2)+ '/' +('0' + d.getHours()).slice(-2) + ':' +('0' + d.getMinutes()).slice(-2) + ':' +('0' + d.getSeconds()).slice(-2) + '/' + firebase.auth().currentUser.uid).set  ({
    step : 123,
    set : 456
  })
  return {
    type: 'ADDHISTORY',
    payload: 'Ad temp history'
  }
}
export function goNext (num, len) {
  console.log(len)
  if (num >= len) {
    num = 0
  }
  return {
    type: 'GONEXT',
    Npayload: num,
    payload: 'GO NEXT'
  }
}
export function goPrevious (num, len, minus) {
  console.log(num)
  if (num < -minus + 1) {
    num = Math.ceil(len - minus)
  }
  if (num <-1) {
    num = 0
  }
  return {
    type: 'GOPREVIOUS',
    Npayload: num,
    payload: 'GO PREVIOUS'
  }
}
export function clearNum () {
  return {
    type: 'CLEARNUM',
    payload: 'CLEAR PAGE NUMBER'
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