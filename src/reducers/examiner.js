const ExReducer = (state = {
  username: '',
  password: '',
  repassword: '',
  mobile: '',
  email: '',
  canlog: false,
  text: '',
  payment: false,
  loading: true,
  history: [],
  num: 0,
  date: '',
  id: 0
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
  case 'GETHIS':
    state = {
      ...state,
      history: action.Hpayload,
      text: action.payload
    }
    break
  case 'GETID':
    state = {
      ...state,
      id: action.Ipayload,
      text: action.payload
    }
    break
  case 'SETDATE': {
    state = {
      ...state,
      date: action.Dpayload,
      text: action.payload
    }
  }
    break
  case 'CLEARDATE':
    state = {
      ...state,
      date: '',
      text: action.payload
    }
    break
  default :
    break
  }
  return state
}
export default ExReducer
  