var express = require('express');
var passport = require('passport');
var router = express.Router();


router.route('/google')
    .get(passport.authenticate('google', { scope: ['profile','email'] }));


router.route('/google/callback')
	.get(passport.authenticate('google', { failureRedirect: '/' }),
		  function(req, res) {
		    res.redirect('/users/');
		  });


router.route('/twitter')
    .get(passport.authenticate('twitter'));

router.route('/twitter/callback')
	.get(passport.authenticate('twitter', { failureRedirect: '/' }),
		  function(req, res) {
		    res.redirect('/users/');
		  });



module.exports = router;
