var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
var User = require('../models/user')

// We still can use __dirname here but now our dirname is not correct so ejs cannot read it correctly
//router.use(express.static((__dirname + '../public') + '/css/style.css'))
router.use(express.static("public"))
router.use(bodyParser.urlencoded({extended: true}))

router.get('/login', (req,res) => {
    res.render('sign_in', {error: '', username: '', password: ''})
})

router.post('/login', (req, res) => {
    // Simple Form validation
    let account = req.body

    console.log(account.username + " " + account.password)

    let error = undefined

    if(!account.username){
        error = "Please enter your username 😢"
    }

    else if(!account.password){
        error = "Please enter your password 😢"
    }//End of simple validation

    // Login function begins
    else{
        // User.find({username: account.username},function(err,data){
        //     if(data){
        //         console.log(data)
        //         if(data.password == account.password){
        //             //console.log("Done Login");
        //             //req.session.userId = data.unique_id;
        //             //console.log(req.session.userId);
        //             res.send({"Success":"Success!"});
                    
        //         }else{
        //             res.send({"Success":"Wrong password!"});
        //         }
        //     }else{
        //         res.send({"Success":"This Email Is not regestered!"});
        //     }
        // });
        User.find({}, function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.json(result);
            }
        });
    }

    if(error){
        res.render('sign_in', {error: error, username: username, password: password})
    }
})

module.exports = router