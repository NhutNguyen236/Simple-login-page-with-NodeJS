const e = require('express')
var express = require('express')
var router = express.Router()

router.use(express.static("/public"))

router.get('/index', (req, res) => {
    // In Index, if there no session, go back to login to create one
    if(!req.session.userId){
        res.redirect('/login')
    }
    else{
        res.render('index')
    }
    
})

module.exports = router