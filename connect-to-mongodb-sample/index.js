//lets require/import the mongodb native drivers.
var mongodb = require('mongodb')

var mongoose = require('mongoose')

var express = require('express')

var app = express()

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connect URL
// To connect with localhost just use this here 
// const url = 'mongodb://localhost:27017/name-of-your-db';
const url = 'mongodb+srv://Brandon:AcTTsqW4g4OpTl2q@testcluster.mzwal.mongodb.net/test';

app.get('/add', (req, res) => {
  // Connec to MongoDB
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
        return console.log(err);
    }

    // Specify database you want to access
    const db = client.db('users');

    res.send('Your Database is connected to: ' + url);

    // create collection or select collection from mongo if it already exists
    const user = db.collection('user')

    user.insertOne({id: 1, username: 'username1', password: '12345'}, (err, result) => { });
  });
})

app.get('/find', (req, res) => {
  // Connec to MongoDB
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) {
        return console.log(err);
    }

    // Specify database you want to access
    const db = client.db('users');

    res.send('Your Database is connected to: ' + url);

    // create collection or select collection from mongo if it already exists
    const user = db.collection('user')

    user.findOne({ username: 'username1' }, (err, result) => {
      console.log(result)
    });
    
  });
})

const server = app.listen(8080, (req, res) => {
  console.log('http://localhost:8080')
})

