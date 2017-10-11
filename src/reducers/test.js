const testReducer = (state = {
    room: [],
    num: 0,
    device: [],
    text: ''
  }, action) => {
    switch (action.type) {
      case 'SHOWROOM': {
        state = {
          ...state,
          room: action.room,
          text: action.payload
        }
      }
      break
      case 'ADDROOM': {
        state = {
          ...state,
          text: action.payload
        }
      }
      break
      case 'DELROOM': {
        state = {
          ...state,
          text: action.payload
        }
      }
      break
      case 'SETROOM': {
        state = {
          ...state,
          text: action.payload
        }
      }
        break
      case 'ADDDEVICE': {
        state = {
          ...state,
          text: action.payload
        }
      }
        break
      case 'SHOWDEVICE': {
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
      }
        break
      case 'DELROOM': {
        state = {
          ...state,
          text: action.payload
        }
      }
        break
      case 'GETROOMNUM': {
        state = {
          ...state,
          num: action.num,
          text: action.payload
        }
      }
      default :
        break
    }
    return state
  }
  export default testReducer
  