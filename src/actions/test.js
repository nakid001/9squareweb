import * as firebase from 'firebase'  
export function showroom(arr) {
    return {
      type:'SHOWROOM',
      room: arr,
      payload: 'SHOW ROOM'
    }
  }
  export function addroom() {
    let i = 0
    let num = []
    let j = 0
    firebase.database().ref('/rooms/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          num[i]=childSnapshot.val().num
          i++
      })
    }).then(() => {
      console.log(num)
      for (j= 1; j <= 10; j++) {
        if (!num.includes(j)) {
          alert(j)
          break 
        } else {
         console.log(num.length) 
        }
      }
      let updates = {}
      updates['/rooms/room'+j] = {num : j , ava : false}
      firebase.database().ref().update(updates);  
    })  
    return{
      type:'ADDROOM',
      payload: 'ADD ROOM'
    }
  }
  
  export function setActive(num) {
    firebase.database().ref('/rooms/room' + num).once('value', function (snapshot) {
      if (snapshot.val().ava) {
        firebase.database().ref('/rooms/room' + num).update({ava : false})
      } else {
        firebase.database().ref('/rooms/room' + num).update({ava : true})
      }
    })
    return{
      type:'SETROOM',
      payload: 'SET ACTIVE ROOM'
    }
  }

  export function delRoom(num) {
    firebase.database().ref('/rooms/room' + num).remove()
    return{
      type:'DELROOM',
      payload: 'DELETE ROOM'
    }
  }