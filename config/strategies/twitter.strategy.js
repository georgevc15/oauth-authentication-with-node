var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function() {
	passport.use(new TwitterStrategy({
		consumerKey: 'RnEVctWqhLQuDqwGUsdVoTBYs',
		consumerSecret: 'kQOUxLYkqkUtnnVBXgwL9TxfdR7MUZ0F7ZYt54XLsx8exMtiBO',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	function(token, tokenSecret, profile, cb) {
		    
		    var user = {}; //create a user object

			//user.email = profile.emails[0].value;
			user.image = profile.profile_image_url;
			user.displayName = profile.displayName;

			user.twitter = {}; //create a google user object
			user.twitter.id = profile.id;
			user.twitter.token = token;

		    return cb(null, user);
	 }
  ))
}
