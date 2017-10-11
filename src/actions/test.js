import * as firebase from 'firebase'  
export function getRoomNum (n) {
  return {
    type: 'GETROOMNUM',
    num: n,
    payload: 'GET ROOM NUMBER'
  }
}
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
  export function showDevice(arr) {
    return {
      type:'SHOWDEVICE',
      device: arr,
      payload: 'SHOW DEVICE'
    }
  }
  export function addDevice(c) {
    let i = 0
    let num = []
    let j = 0
    firebase.database().ref('/rooms/room' + c + '/devices/').once('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          num[i]=childSnapshot.val().num
          i++
      })
    }).then(() => {
      console.log(num)
      for (j= 1; j <= 10; j++) {
        if (!num.includes(j)) {
          break 
        } else {
         console.log(num.length) 
        }
      }
      let updates = {}
      updates['/rooms/room' + c + '/devices/device'+j] = {num : j , ava : false}
      firebase.database().ref().update(updates);  
    })  
    return{
      type:'ADDDEVICE',
      payload: 'ADD DEVICE'
    }
  }
  export function setDeviceActive(num, c) {
    firebase.database().ref('/rooms/room' + c + '/devices/device' + num).once('value', function (snapshot) {
      if (snapshot.val().ava) {
        firebase.database().ref('/rooms/room' + c + '/devices/device' + num).update({ava : false})
      } else {
        firebase.database().ref('/rooms/room' + c + '/devices/device' + num).update({ava : true})
      }
    })
    return{
      type:'SETDEVICE',
      payload: 'SET ACTIVE DEVICE'
    }
  }
  export function delDevice(num, c) {
    firebase.database().ref('/rooms/room' + c + '/devices/device' + num).remove()
    return{
      type:'DELDEVICE',
      payload: 'DELETE DEVICE'
    }
  }