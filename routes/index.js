var express = require('express')
var router = express.Router()

router.use(express.static("public"))

router.get('/index', (req,res) => {
    res.render('index')
})

module.exports = router