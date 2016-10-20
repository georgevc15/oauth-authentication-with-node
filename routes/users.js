var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')('606810949526202','c35d1ac2de947208c400d13bec1deece')
var twitter = require('../services/twitter')('RnEVctWqhLQuDqwGUsdVoTBYs','kQOUxLYkqkUtnnVBXgwL9TxfdR7MUZ0F7ZYt54XLsx8exMtiBO')

router.use('/', function(req, res, next) {

	if(!req.user){
		res.redirect('/');
	}
	next();
})


/*
router.get('/', function(req, res, next) {

});*/


router.get('/', function(req, res, next) {
 
 /*res.render('users', {user: {name: req.user.displayName,
 					  image: req.user.image}});	*/
 //res.send(req.user);	
 	

	

	if(req.user.twitter) {
		 twitter.getUserTimeLine(req.user.twitter.token,
								req.user.twitter.tokenSecret,
								req.user.twitter.id,
							function(results) {
								//req.user.twitter.mesaj = results[0].text;
								req.user.twitter.mesaj = results[0].text;
								res.render('users', {user: req.user});	
					});
		}



 	/*if(req.user.facebook) {
 		facebook.getImage(req.user.facebook.token,
 				function(results) {
 						req.user.facebook.image = results.url;
 						
 						facebook.getFriends (req.user.facebook.token,
 							function(results) {
 								req.user.facebook.friends = results.total_count;
 						
							res.render('users', {user: req.user});	
 						}
 					)
 				})
 	} else {
 		 res.render('users', {user: req.user});	
 	}*/

	

});

module.exports = router;
