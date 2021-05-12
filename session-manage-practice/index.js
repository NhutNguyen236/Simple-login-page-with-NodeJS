const express = require("express")
const session = require('express-session')
const app = express()
	
// Port Number Setup
var PORT = process.env.port || 3000

// Session Setup
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

app.get("/", function(req, res){
	
	req.session.name = 'Test_Session'
	req.session.uid = '123'
	console.log(typeof(req.session))
	return res.send("Session Set")
})

app.get("/session", function(req, res){

	var name = req.session.name
	if(!name){
		res.send('Your session is not here')
	}
	else{
		res.send(name)
	}

	/* To destroy session you can use
		this function
	req.session.destroy(function(error){
		console.log("Session Destroyed")
	})
	*/
})

app.get('/logout', (req, res) => {
	if(req.session){
		req.session.destroy((error) => {
			if(error){
				res.send(error)
			}
			else{
				res.send('session has been removed')
			}
		})
	}
})
	
app.listen(PORT, function(error){
	if(error) throw error
	console.log('http://localhost:' + PORT)
})
