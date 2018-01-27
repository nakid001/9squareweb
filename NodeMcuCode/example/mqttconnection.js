let firebase = require('firebase')

let mqtt = require('mqtt'); //includes mqtt server 
let mongodb = require('mongodb'); // includes mongoDB 
let mongodbClient = mongodb.MongoClient; //initialises the mongoDB client
let mongodbURI = 'mongodb://127.0.0.1:27017/db'; //activating the MongoDB port 27017, here TempMontor is the name of the database
let deviceRoot = "room1/temp"; //deviceroot is topic name given in arduino code 
let collection,client; //initialise collection and client
let mongoose = require('mongoose');
let order = []
let start = false
let config = {
  apiKey: "AIzaSyBN4-YyLBgRJe-_ZuBe1OtpOYYXsw29P6c",
  authDomain: "nafire-18969.firebaseapp.com",
  databaseURL: "https://nafire-18969.firebaseio.com",
  projectId: "nafire-18969",
  storageBucket: "nafire-18969.appspot.com",
  messagingSenderId: "463051690711"
}
let a = firebase.initializeApp(config)
getDataFirebase()
mongodbClient.connect(mongodbURI, function(err, database) {
//   if(err) throw err;
//   db=database.db("mydb")
//   collection=db.collection("real"); //name of the collection in the database
//   client=mqtt.connect({ host: 'localhost', port: 1883 }); //connecting the mqtt server with the MongoDB database
//   client.subscribe(deviceRoot); //subscribing to the topic name 
//   client.on('message', insertEvent);
}) 

function insertEvent(topic,payload) {  
  let key=topic.replace(deviceRoot,'');
  firebase.database().ref('/mqtt').set({  // FOR FIREBASE
    event: { value:payload.toString(), when:new Date() } })    
  collection.insert({  //FOR MONGODB
    events: payload.toString(),
    when:new Date() 
  }).then(() => {
      console.log('Insert Complete')
  })
}

function getDataFirebase () {
  firebase.database().ref('/rooms/room1/order/').on("value", function(snapshot) {
    console.log("READING DATA")
    console.log(snapshot.val())
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code)
  });
  
}