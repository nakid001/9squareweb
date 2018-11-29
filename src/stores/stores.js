import {createStore, applyMiddleware} from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
// import myfirebase from '../myfirebase.js'
import * as firebase from 'firebase';

// let a = myfirebase
const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)

var config = {
    apiKey: "AIzaSyBN4-YyLBgRJe-_ZuBe1OtpOYYXsw29P6c",
    authDomain: "nafire-18969.firebaseapp.com",
    databaseURL: "https://nafire-18969.firebaseio.com",
    projectId: "nafire-18969",
    storageBucket: "nafire-18969.appspot.com",
    messagingSenderId: "463051690711"
  };
firebase.initializeApp(config);

export default createStoreWithMiddleware(reducers, {}, applyMiddleware(thunk))

