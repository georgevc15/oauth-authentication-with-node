var passport = require('passport');


module.exports = function(app) {
		
		app.use(passport.initialize());
		app.use(passport.session());

		passport.serializeUser(function(user, cb) {
		  cb(null, user);
		  console.log(user);
		});


		passport.deserializeUser(function(obj, cb) {
		   cb(null, obj);
		});

		require('./strategies/google.strategy')();
		require('./strategies/twitter.strategy')();

};