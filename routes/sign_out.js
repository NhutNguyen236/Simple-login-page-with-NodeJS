var express = require('express')
var router = express.Router()

router.get('/logout', (req, res) => {
    if(req.session){
		req.session.destroy((error) => {
			if(error){
				res.send(error)
			}
			else{
				res.redirect('/login')
			}
		})
	}
})

module.exports = router