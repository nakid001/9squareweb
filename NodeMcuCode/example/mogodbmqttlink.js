var mqtt = require('mqtt'); //includes mqtt server 
var mongodb = require('mongodb'); // includes mongoDB 
var mongodbClient = mongodb.MongoClient; //initialises the mongoDB client
var mongodbURI = 'mongodb://127.0.0.1:27017/db'; //activating the MongoDB port 27017, here TempMontor is the name of the database
var deviceRoot = "room1/temp"; //deviceroot is topic name given in arduino code 
var collection,client; //initialise collection and client
var mongoose = require('mongoose');


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
    collection.insert({admin:'eiei'})
}