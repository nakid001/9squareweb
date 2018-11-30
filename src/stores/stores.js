import {createStore, applyMiddleware} from 'redux'
import reducers from '../reducers'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import initFirebase from './myfirebase'
// import myfirebase from '../myfirebase.js'

initFirebase()
const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)



export default createStoreWithMiddleware(reducers, {}, applyMiddleware(thunk))

