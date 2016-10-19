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
		    //res.send(req.user);
		    res.redirect('/users/');
		  });


router.route('/facebook')
  .get(passport.authenticate('facebook', {
  		scope: ['email', 'user_friends']
  }));

router.route('/facebook/callback') 
  .get(passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/users');
  });


module.exports = router;
