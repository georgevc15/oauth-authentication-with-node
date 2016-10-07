var express = require('express');
var passport = require('passport');
var router = express.Router();


router.route('/google')
    .get(passport.authenticate('google', { scope: ['profile','email'] }));


router.route('/google/callback')
	.get(passport.authenticate('google', { failureRedirect: '/login' }),
		  function(req, res) {
		    res.redirect('/users/');
		  });


module.exports = router;
