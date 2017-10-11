const testReducer = (state = {
    room: [],
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
        state = {
          ...state,
          device: action.device,          
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
      default :
        break
    }
    return state
  }
  export default testReducer
  