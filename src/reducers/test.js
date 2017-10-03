const testReducer = (state = {
    room: [],
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
      default :
        break
    }
    return state
  }
  export default testReducer
  