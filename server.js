var sign_in = require('./routes/sign_in.js')
var sign_out = require('./routes/sign_out.js')
var index = require('./routes/index.js')

var express = require('express')
var mongoose = require('mongoose')
var passport = require('passport')
var session = require('express-session')

var app = express()
app.set('view engine', 'ejs')

// Port Number Setup
var PORT = process.env.port || 8080

// Connect to DB
// connect to database
// MOST IMPORTANT THING IS HERE, mongodb://localhost:27017/x, x here is your DATABASE NAME
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

// Use session
app.use(session({

	// It holds the secret key for session
	secret: 'Your_Secret_Key',

	// Forces the session to be saved
	// back to the session store
	resave: true,

	// Forces a session that is "uninitialized"
	// to be saved to the store
	saveUninitialized: true
}))

// app.use(passport.initialize());
// app.use(passport.session());
  
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.use(express.static("./public"))
// use once and other time get all :D, thatz a trick
app.use('/', sign_in)
app.all('/index', index)
app.all('/logout', sign_out)


var server = app.listen(PORT, () =>{
    console.log("The server is now running at http://localhost:" + PORT);
})
