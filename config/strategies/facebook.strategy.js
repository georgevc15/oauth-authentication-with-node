var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/userModel');


module.exports = function() {
	passport.use(new FacebookStrategy({
		clientID: '606810949526202',
		clientSecret: 'c35d1ac2de947208c400d13bec1deece',
		callbackURL : 'http://localhost:3000/auth/facebook/callback',
		profileFields: ['id', 'displayName', 'photos', 'email']
	},
	function(req, accessToken, refreshToken, profile, cb){


		if(req.user){
			var query = {};
			if(req.user.google)
			{
				console.log('google');
				var query = {
					'google.id': req.user.google.id
				};
			} else if(req.user.twitter) {
				var query = {
					'twitter.id': req.user.twitter.id
				};
			}

			User.findOne(query, function (error, user) {
				if(user) {
					user.facebook = {}; 
					user.facebook.id = profile.id;
					user.facebook.token = accessToken;

				    user.save();
				     cb(null, user);
				}
			});
		}
		else { 
		//var user = {}; //create a user object
		  var query = {
		  	'facebook.id': profile.id
		  };


		  User.findOne(query, function(error, user) {
		  		if (user) {
		  			console.log('found');
		  			cb(null, user);
		  		} else {

					console.log('Not found');
		  			var user = new User;

					user.email = profile.email;
					//user.image = profile._json.image.url;
					user.displayName = profile.displayName;

					user.facebook = {}; 
					user.facebook.id = profile.id;
					user.facebook.token = accessToken;

					user.save();
					return cb(null, user);

		 		}
		  	});	
		  }	
	}));
}	