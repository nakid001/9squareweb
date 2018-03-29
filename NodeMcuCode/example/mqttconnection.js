let firebase = require('firebase')
let mqtt = require('mqtt') //includes mqtt server 
let mongodb = require('mongodb') // includes mongoDB 
let mongodbClient = mongodb.MongoClient //initialises the mongoDB client
let mongodbURI = 'mongodb://127.0.0.1:27017/db' //activating the MongoDB port 27017, here TempMontor is the name of the database
let deviceRoot = '/dev/' //deviceroot is topic name given in arduino code 
let collection,client //initialise collection and client
let order = []
let start = false
let i = 0, step = 0, set = 0, count = 0

let config = {
  apiKey: 'AIzaSyBN4-YyLBgRJe-_ZuBe1OtpOYYXsw29P6c',
  authDomain: 'nafire-18969.firebaseapp.com',
  databaseURL: 'https://nafire-18969.firebaseio.com',
  projectId: 'nafire-18969',
  storageBucket: 'nafire-18969.appspot.com',
  messagingSenderId: '463051690711'
}
let a = firebase.initializeApp(config)

getRoomnumber()
mongodbClient.connect(mongodbURI, (err, database) => {
  if(err) throw err
  db=database.db('mydb')
  collection=db.collection('real') //name of the collection in the database
  client=mqtt.connect({ host: 'localhost', port: 1883 }) //connecting the mqtt server with the MongoDB database
  client.subscribe(deviceRoot+'+') //subscribing to the topic name 
  client.on('message', insertEvent)
})

function getRoomnumber() {
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  rl.question('Enter Room number ', (answer) => {
    rl.close()
    roomnum = answer
    getDataFirebase(answer)
    
  })
}
function insertEvent(topic,payload) {  
  let key=topic.replace(deviceRoot,'')
  console.log(payload.toString())
  if (start === 'START') {
    if (payload.toString() === order[count]) {
      count++
      step++
      if (count === order.length) {
        console.log(count + 'count')
        set++
        count = 0
      }
    } else {
      console.log(order[count] + ': is the correct not ' + payload.toString())
      console.log('MISSING')
    }
  }
}

function getDataFirebase (roomnum) {
  firebase.database().ref('/rooms/room' + roomnum +'/order/').on('value', (snapshot) => {
    order = []
    snapshot.forEach((childSnapshot) => {
      order.push(childSnapshot.val().substring(0,1))
    })        
    console.log('READING DATA')
    console.log(order)
  },  (errorObject) => {
    console.log('The read failed: ' + errorObject.code)
  })
  let uname = '' 
  firebase.database().ref('/devices/device1').once('value', (snapshot) => {
    uname=snapshot.val().last_user
  })
  firebase.database().ref('/rooms/room' + roomnum +'/start/').on('value', (snapshot) => {
    start = snapshot.val()
    if (start === 'START') {
      console.log('START')
    } else if (start === 'END') {   
      collection.insert({  //FOR MONGODB
        event: { step: step, set: set, when:new Date() } 
      }).then(() => {
        let num = 1
        console.log('num = ' + num)
        let usr = []
        let result = [] //ไว้มาเพิ่มresult ทีหลัง
        let i = 0
        firebase.database().ref('/rooms/room' + num).update({
          start: 'END'
        })
        firebase.database().ref('/rooms/room' + num + '/devices').once('value', function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.val().uid) {  
              usr[i] = childSnapshot.val().uid
              result[i] = {
                step: step,
                set : set
              }
              i++
              console.log('usr = ' + childSnapshot.val().uid)
            }
          })
          console.log('result = ' + result)
        }).then(() => {
          let d = new Date()
          firebase.database().ref('/history/' +  d.getFullYear() + '/' + ('0' + d.getMonth()).slice(-2) + '/' + ('0' + d.getDate()).slice(-2) + '/' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds  ()).slice(-2) + '/' + uname).set  ({
            step : result[0].step,
            set : result[0].set
          })
          firebase.database().ref('/rooms/room' + roomnum).update({
            start: 'READY'
          })

          i = 0; step = 0; set = 0  
          console.log('Insert Complete')
        })
      })
      console.log('END')
    } else if (!start){
      console.log('ROOM NOT AVA')
    }    
  })
}