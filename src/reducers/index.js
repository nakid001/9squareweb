import { combineReducers } from 'redux'

import userReducer from './user'
import testReducer from './test'
import ExReducer from './examiner'


const rootReducer = combineReducers({
  user: userReducer,
  test: testReducer,
  exam: ExReducer
})

export default rootReducer
