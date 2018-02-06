const ExReducer = (state = {
  username: '',
  password: '',
  repassword: '',
  mobile: '',
  email: '',
  canlog: false,
  text: '',
  payment: false,
  loading: true
}, action) => {
  switch (action.type) {
  case 'LOGIN':
    state = {
      ...state,
      username: action.Upayload,
      password: action.Ppayload,
      text: action.payload
    }
    break
  case 'LOGFIRE':
    state = {
      ...state,
      text: action.payload
    }
    break
  case 'LOGMAIL':
    state = {
      ...state,
      text: action.payload
    }
    break
  case 'REGFIRE':
    state = {
      ...state,
      text: action.payload
    }
    break
  case 'INPUTREG':
    state = {
      ...state,
      username: action.Upayload,
      password: action.Ppayload,
      repassword: action.RPpayload,
      payload: action.payload
    }
    break
  case 'INPUTLOG':
    state = {
      ...state,
      username: action.Upayload,
      password: action.Ppayload,
      payload: action.payload
    }
    break
  default :
    break
  }
  return state
}
export default ExReducer
  