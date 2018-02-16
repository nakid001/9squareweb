const initialState = {
  room: [],
  num: 0,
  device: [],
  text: '',
  order: [],
}
const testReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SHOWROOM':
    state = {
      ...state,
      room: action.room,
      text: action.payload
    }
    break
  case 'ADDROOM':
    state = {
      ...state,
      text: action.payload
    }
    break
  case 'DELROOM':
    state = {
      ...state,
      text: action.payload
    }
    break
  case 'SETROOM':
    state = {
      ...state,
      text: action.payload
    }
    break
  case 'ADDDEVICE':
    state = {
      ...state,
      text: action.payload
    }
    break
  case 'SHOWDEVICE': 
    if (action.device.length === 0) {
      state = {
        ...state,
        device:' EMPTY ',
        text:action.payload
      }
    } else {
      state = {
        ...state,
        device: action.device,          
        text: action.payload
      }
    }
    break
  case 'PUSHORDER':
    state = {
      ...state,
      order : [...state.order, action.Npayload],
      text: action.payload
    }
    break
  case 'SUBMITORDER':
    state = {
      ...state,
      text: action.payload
    }
    break
  case 'GETORDER':
    state = {
      ...state,
      order : action.Opayload,
      text: action.payload
    }
    break
  case 'CLEARORDER':
    state = {
      ...state,
      order : '',
      text: action.payload
    }
    break
  case 'GETROOMNUM':
    state = {
      ...state,
      num: action.num,
      text: action.payload
    }
    break
  case 'MATCHUSERDEVICE':
    state = {
      ...state,
      text: action.payload
    }
    break
  case 'MATCHDEVICE':
    state = {
      ...state,
      text: action.payload
    }
    break
  case 'SENDRESULT':
    state = {
      ...state,
      text: action.payload
    }
    break
  default :
    break
  }
  return state
}
export default testReducer
  