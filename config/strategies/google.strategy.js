var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(){

	passport.use(new GoogleStrategy({
		        clientID: '378340219192-rhljo81k7h3nctse8rk1eb1l2vaur2c5.apps.googleusercontent.com',
		        clientSecret: 'zRn9w5c6z5SSOMjqO0iRxAQR',
		        callbackURL: 'http://localhost:3000/auth/google/callback',
		    },
		  function(accessToken, refreshToken, profile, cb) {
		    var user = {}; //create a user object

			user.email = profile.emails[0].value;
			user.image = profile._json.image.url;
			user.displayName = profile.displayName;

			user.google = {}; //create a google user object
			user.google.id = profile.id;
			user.google.token = accessToken;

		    return cb(null, user);
		  }
		));

};