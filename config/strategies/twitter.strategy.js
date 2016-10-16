var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../../models/userModel');


module.exports = function() {
	passport.use(new TwitterStrategy({
		consumerKey: 'RnEVctWqhLQuDqwGUsdVoTBYs',
		consumerSecret: 'kQOUxLYkqkUtnnVBXgwL9TxfdR7MUZ0F7ZYt54XLsx8exMtiBO',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	function(token, tokenSecret, profile, cb) {
		    
		  var user = {}; //create a user object
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

					user.twitter = {}; //create a google user object
					user.twitter.id = profile.id;
					user.twitter.token = token;

				    user.save();
				    return cb(null, user);

	  				}
		  	});	
	 }
  ))
}
