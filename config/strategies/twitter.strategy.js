var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel');


module.exports = function() {
	passport.use(new TwitterStrategy({
		consumerKey: 'RnEVctWqhLQuDqwGUsdVoTBYs',
		consumerSecret: 'kQOUxLYkqkUtnnVBXgwL9TxfdR7MUZ0F7ZYt54XLsx8exMtiBO',
		callbackURL: 'http://localhost:3000/auth/twitter/callback',
		passReqToCallback: true
	},
	function(req, token, tokenSecret, profile, cb) {
		    
		  //var user = {}; //create a user object


		if(req.user){
			var query = {};
			if(req.user.google)
			{
				console.log('google');
				var query = {
					'google.id': req.user.google.id
				};
			} else if(req.user.facebook) {
				var query = {
					'facebook.id': req.user.facebook.id
				};
			}

			User.findOne(query, function (error, user) {
				if(user) {
					user.twitter = {};
					user.twitter.id = profile.id;
					user.twitter.token = token;
					user.twitter.tokenSecret = tokenSecret;

				    user.save();
				     cb(null, user);
				}
			});
		}
		else { 
		  var query = {
		  	'twitter.id': profile.id
		  };

			 User.findOne(query, function(error, user) {
		  		if (user) {
		  			console.log('found');
		  			cb(null, user);
		  		} else {
		  			console.log('Not found');
		  			var user = new User;

					//user.email = profile.emails[0].value;
					user.image = profile.profile_image_url;
					user.displayName = profile.displayName;

					user.twitter = {}; 
					user.twitter.id = profile.id;
					user.twitter.token = token;
					user.twitter.tokenSecret = tokenSecret;

				    user.save();
				    return cb(null, user);

	  				}
		  	});	
	 	}
	
	 }));
}
