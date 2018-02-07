import * as firebase from 'firebase'
let config = {
  apiKey: '',
  authDomain: 'nafire-18969.firebaseapp.com',
  databaseURL: 'https://nafire-18969.firebaseio.com',
  projectId: 'nafire-18969',
  storageBucket: 'nafire-18969.appspot.com',
  messagingSenderId: '463051690711'
}
let a = firebase.initializeApp(config)
export default a
console.log(firebase.database())
