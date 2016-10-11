var passport = require('passport'),
	FacebookStrategy = require('passport-facebook').Strategy;



module.exports = function() {
	passport.use(new FacebookStrategy({
		clientID: '606810949526202',
		clientSecret: 'c35d1ac2de947208c400d13bec1deece',
		callbackURL : 'http://localhost:3000/auth/facebook/callback',
		profileFields: ['id', 'displayName', 'photos', 'email']
	},
	function(accessToken, refreshToken, profile, cb){

		var user = {} ;

		user.email = profile.email;
		//user.image = profile._json.image.url;
		user.displayName = profile.displayName;

		user.facebook = {}; //create a google user object
		user.facebook.id = profile.id;
		user.facebook.token = accessToken;

		return cb(null, user);

	}));
}	