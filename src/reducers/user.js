const userReducer = (state = {
  username: '',
  password: '',
  repassword: '',
  mobile: '',
  email: '',
  canlog: false,
  text: '',
  history: [],
  ranking: [1],
  num:0,
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
  case 'GETHIS' :
    state = {
      ...state,
      history: action.Hpayload,
      username: action.Upayload,
      payload: action.payload
    }
    break
  case 'ADDHIS' :
    state = {
      ...state,
      text: action.payload
    }
    break
  case 'GONEXT' :
    state = {
      ...state,
      num: action.Npayload,
      text: action.payload
    }
    break
  case 'GOPREVIOUS' :
    state = {
      ...state,
      num: action.Npayload,
      text: action.payload
    }
    break
  case 'CLEARNUM' :
    state = {
      ...state,
      num: 0,
      text: action.payload
    }
    break
  case 'GETRANK' :
    state = {
      ...state,      ranking: action.Rpayload,
      username: action.Upayload,
      payload: action.payload
    }
    break
  case 'CANLOG': 
    state = {
      ...state,
      username: action.Upayload,
      loading: action.Lpayload
    }
    break
  case 'CANNOTLOG':
    state = {
      ...state,
      username: action.Upayload,
      loading: action.Lpayload
    }
    break
  default :
    break
  }
  return state
}
export default userReducer
  