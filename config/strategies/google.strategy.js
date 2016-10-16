var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../../models/userModel');

module.exports = function(){

	passport.use(new GoogleStrategy({
		        clientID: '378340219192-rhljo81k7h3nctse8rk1eb1l2vaur2c5.apps.googleusercontent.com',
		        clientSecret: 'zRn9w5c6z5SSOMjqO0iRxAQR',
		        callbackURL: 'http://localhost:3000/auth/google/callback',
		    },
	function(accessToken, refreshToken, profile, cb) {

		  var user = {}; //create a user object
		  var query = {
		  	'google.id': profile.id
		  };

		  User.findOne(query, function(error, user) {
		  		if (user) {
		  			console.log('found');
		  			cb(null, user);
		  		} else {
		  			console.log('Not found');
		  			var user = new User;
		  		
					user.email = profile.emails[0].value;
					user.image = profile._json.image.url;
					user.displayName = profile.displayName;

					user.google = {}; //create a google user object
					user.google.id = profile.id;
					user.google.token = accessToken;

				    user.save();
				    return cb(null, user);

		  		}
		  	});	
		 }
		
	));

};