let firebase = require('firebase')

let mqtt = require('mqtt'); //includes mqtt server 
let mongodb = require('mongodb'); // includes mongoDB 
let mongodbClient = mongodb.MongoClient; //initialises the mongoDB client
let mongodbURI = 'mongodb://127.0.0.1:27017/db'; //activating the MongoDB port 27017, here TempMontor is the name of the database
let deviceRoot = "room1/temp"; //deviceroot is topic name given in arduino code 
let collection,client; //initialise collection and client
let mongoose = require('mongoose');
let config = {
    apiKey: "AIzaSyBN4-YyLBgRJe-_ZuBe1OtpOYYXsw29P6c",
    authDomain: "nafire-18969.firebaseapp.com",
    databaseURL: "https://nafire-18969.firebaseio.com",
    projectId: "nafire-18969",
    storageBucket: "nafire-18969.appspot.com",
    messagingSenderId: "463051690711"
}
let a = firebase.initializeApp(config)

mongodbClient.connect(mongodbURI, function(err, database) {
    if(err) throw err;
   db=database.db("mydb")
   collection=db.collection("real"); //name of the collection in the database
   client=mqtt.connect({ host: 'localhost', port: 1883 }); //connecting the mqtt server with the MongoDB database
   client.subscribe(deviceRoot); //subscribing to the topic name 
   client.on('message', insertEvent);
}); //connect the database with collecion

//function that displays the data in the MongoDataBase
function insertEvent(topic,payload) {  
    var key=topic.replace(deviceRoot,'');
    // collection.update(  
    //     { _id:key },
    //     { $push: { events: { event: { value:payload, when:new Date() } } } },
    //     { upsert:true },
    //     function(err,docs) {
    //       if(err) { console.log("Insert fail"); } // Improve error handling
    //     }
    // )

    firebase.database().ref('/mqtt').set({ava : false})    
    collection.insert({admin:'eiei'}).then(() => {
        console.log('Insert Complete')
    })
}