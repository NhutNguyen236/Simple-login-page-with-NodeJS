var sign_in = require('./routes/sign_in.js')
var index = require('./routes/index.js')
var express = require('express')
var app = express()

app.set('view engine', 'ejs')

// use once and other time get all :D, thatz a trick
app.use('/', sign_in)
app.all('/index', index)

var server = app.listen(8080, () =>{
    console.log("The server is now running at http://localhost:8080");
})