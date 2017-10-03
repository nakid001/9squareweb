import * as firebase from 'firebase'  
export function showroom(arr) {
    return {
      type:'SHOWROOM',
      room: arr,
      payload: 'SHOW ROOM'
    }
  }
  export function addroom() {
    firebase.database().ref('/Room/').push({
      Room3: false
    }).catch((error) => {
      alert(error)
    })
    return{
      type:'ADDROOM',
      payload: 'ADD ROOM'
    }
  }