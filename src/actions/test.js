import * as firebase from 'firebase'  
// import { key } from 'firebase-key'

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
    updates['/rooms/room'+j] = {num : j , ava : false, start : false}
    firebase.database().ref().update(updates)  
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
  firebase.database().ref('rooms/room' + num + '/devices/').once('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      console.log(childSnapshot.key)
      firebase.database().ref('devices/'+childSnapshot.key).update({ava: 'AVALIABLE'})
    })
  }).then(() => {
    firebase.database().ref('/rooms/room' + num).remove()
  })
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

export function addDevice(num) {
  let i = 1
  firebase.database().ref('/devices/').once('value', (snapshot) => {
    snapshot.forEach(() => {
      i++
    })
  }).then(() => {
    let updates = {}
    updates['devices/device'+i] = {num : i , ava : 'AVALIABLE'}
    firebase.database().ref().update(updates)  
  })  
  return{
    type:'ADDDEVICE',
    payload: 'ADD DEVICE'
  }
}

export function matchDevice(c, numMatch) {
  let updates = {}
  firebase.database().ref('/devices/device' + numMatch).once('value', (snapshot) => {
    if (!snapshot.val()) {
      alert('NO DEVICE AVALIABLE')
      return null
    }
    console.log(snapshot.val().ava)
    if (snapshot.val().ava === 'AVALIABLE') {
      updates['/rooms/room' + c + '/devices/device'+numMatch] = {num : numMatch , ava : true}
      updates['/devices/device' + numMatch] = {num : numMatch , ava : 'ROOM'+c}
    } else if (snapshot.val().ava === 'false') {
      alert('DEVICE NOT AVALIABLE')
    } else {
      alert('DEVICE AT ' + snapshot.val().ava)
    }

  }).then(() => {
    firebase.database().ref().update(updates)  
  })
  return{
    type:'MATCHDEVICE',
    payload: 'MATCH DEVICE'
  }
}

export function setDeviceActive(num, c) {
  firebase.database().ref('/rooms/room' + c + '/devices/device' + num).once('value', function (snapshot) {
    if (snapshot.val().ava) {
      firebase.database().ref('/rooms/room' + c + '/devices/device' + num).update({ava : false})
    } else {
      firebase.database().ref('/rooms/room' + c + '/devices/device' + num).update({ava : true, user: '', uid: ''})
    }
  })
  return{
    type:'SETDEVICE',
    payload: 'SET ACTIVE DEVICE'
  }
}

export function delDevice(num, c) {
  let updates = []
  updates['/devices/device' + num] = {num : num , ava : 'AVALIABLE'}
  console.log(updates)
  firebase.database().ref('/devices/device' + num).update({
    ava: 'AVALIABLE'
  })
  firebase.database().ref('/rooms/room' + c + '/devices/device' + num).remove()

  return{
    type:'DELDEVICE',
    payload: 'DELETE DEVICE'
  }
}

export function pushOrder (num) {
  return {
    type:'PUSHORDER',
    Npayload : num,
    payload: 'PUSHING ORDER '
  }
}

export function submitOrder (c, order) {
  firebase.database().ref('/rooms/room' + c ).update({
    order: order
  }).then(()=>{
    alert('Submitted order')
  })
  return {
    type:'SUBMITORDER',
    payload: 'SUBMITING ORDER'
  }
}

export function getOrder (order) {
  return {
    type:'GETORDER',
    Opayload: order,
    payload: 'GETTING ORDER '
  }
}

export function clearOrder () {
  return {
    type:'CLEARORDER',
    payload: 'CLEARING ORDER '
  }
}

export function matchUserDevice (email, uid, room, num) {
  let olddevice 
  let lastuid
  let lastdeviceuid
  firebase.database().ref('/users/' + uid + '/test').once('value', (snapshot) => {  
    olddevice=snapshot.val().last_device.split('/')
  }).then(() => {
    firebase.database().ref('/rooms/' + olddevice[0] + '/devices/' + olddevice[1]).once('value', (snapshot) => {
      lastuid = snapshot.val().uid
    }).then(() => {
      if (lastuid === uid) {
        firebase.database().ref('/rooms/' + olddevice[0] + '/devices/' + olddevice[1] ).update({
          user : '',
          uid : '',
          ava : true
        })
      }
    }).then(() => {
      firebase.database().ref('/rooms/room' + room + '/devices/device' + num).update({
        user : email,
        uid : uid,
        ava : false
      })
    }).then(() => {
      firebase.database().ref('/devices/' + olddevice[1]).once('value', (snapshot) => {
        lastdeviceuid = snapshot.val().last_user
      }).then(() => {
        if(lastdeviceuid === uid) {
          firebase.database().ref('/devices/' + olddevice[1]).update({
            last_user: ''
          })
        }
      }).then(() => {
        firebase.database().ref( '/devices/device' + num).update ({
          last_user: uid
        })
      })
    }).then(() => {
      firebase.database().ref('/users/' + uid + '/test').update({
        last_device : 'room' + room +'/device'+num
      })
    })
  })
  return {
    type:'MATCHUSERDEVICE',
    payload: 'MATCHING USER AND DEVICE  '
  }
}

export function setTime (time, roomnum) {
  firebase.database().ref('rooms/room' + roomnum).update({
    time:time
  })
  return {
    type: 'SETTIME',
    time: time,
    payload: 'SET TIME FOR THE TEST'
  }
}

export function sendresult (num) {
  firebase.database().ref('/rooms/room' + num).update({
    start: 'END'
  })
  return {
    type:'SENDRESULT',
    payload: 'SENDING RESULT'
  }
}

export function showSendingData (arr) {
  return {
    type: 'SHOWSENDINGRESULT',
    Apayload: arr,
    payload: 'SHOW SENDING RESULT',
  }
}
  