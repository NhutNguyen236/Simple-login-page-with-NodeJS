var sign_in = require('./routes/sign_in.js')
var index = require('./routes/index.js')
var express = require('express')
var app = express()
var mongoose = require('mongoose')

app.set('view engine', 'ejs')

// Connect to DB
// connect to database
var db = mongoose.connect('mongodb://localhost:27017/Users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

// use once and other time get all :D, thatz a trick
app.use('/', sign_in)
app.all('/index', index)

var server = app.listen(8080, () =>{
    console.log("The server is now running at http://localhost:8080");
})