var express = require('express');
var router = express.Router();
var models  = require('../models');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
	res.render('register', { title: 'Sign Up' });
});

router.post('/signup', function(req, res, next) {
	var password = req.body.password;
	var email = req.body.email;
	var username = req.body.username;
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(password, salt, function(err, encrypted_password) {
			user = models.User.build({
							username: username,
							email: email,
							password: encrypted_password
						});
			user.save()
			.then(function () {
				res.redirect('/');
			})
			.catch(function (error) {
				console.log(error);
				console.log('------');
				console.log(user.errors);
			});
		});
	});
});

module.exports = router;
