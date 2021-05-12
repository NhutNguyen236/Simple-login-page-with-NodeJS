var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
var User = require('../models/user')

// We still can use __dirname here but now our dirname is not correct so ejs cannot read it correctly
//router.use(express.static((__dirname + '../public') + '/css/style.css'))

router.use(express.static("../public"))
router.use(bodyParser.urlencoded({extended: true}))

router.get('/', (req, res) => {
    res.redirect('/login')
})

router.get('/login', (req,res) => {
    // If session is set, go to index
    if(req.session.userId){
        res.redirect('/index')
    }
    else{
        res.render('sign_in', {error: '', username: '', password: ''})
    }
    
})

router.post('/login', (req, res) => {
    
    // Make a function to render view 
    function render_login(username, password, error){
        return res.render('sign_in', {error: error, username: username, password: password})
    }

    // Simple Form validation
    let {username, password} = req.body

    console.log(username + " " + password)

    let error = undefined

    if(!username){
        error = "Please enter your username 😢"
    }

    else if(!password){
        error = "Please enter your password 😢"
    }//End of simple validation

    // Login function begins
    else{
      User.find({username: username},function(err,data){
          if(data.length != 0){
              console.log(data)
              
              //The return type of the result here is an array of JSON so to access to it properly, put the index in.
              let data_pass = data[0].password
              let data_un = data[0].username
              let data_uid = data[0]._id

              console.log('unique id here is' + data_uid)
              console.log('username from return data is ' + data_un)
              console.log('password from return data is ' + data_pass)

              if(data_pass == password){

                  //console.log("Done Login");
                  req.session.userId = data_uid;
                  //console.log(req.session.userId);
                  res.redirect('/index')
              }
              // !!! The problem here is that it will stop working when we set error with new value every time the condition occurs
              else{
                render_login(username, password, 'Wrong password 😢')
                //res.render('sign_in', {error: 'Wrong password', username: account.username, password: account.password})
              }
          }
          
          else{
            render_login(username, password, 'This user is undefined 😢')
            //res.render('sign_in', {error: 'This user is undefined', username: account.username, password: account.password})
          }
      });
    }

    if(error){
        render_login(username, password, error)
        //res.render('sign_in', {error: error, username: account.username, password: account.password})
    }
})

module.exports = router