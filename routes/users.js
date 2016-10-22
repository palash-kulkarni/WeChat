var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

router.get('/dashboard', function(req, res, next) {
	if (!req.session.user)
		res.redirect('/').send("You're not logged in");
	else
		res.render('dashboard', { title: 'Dashboard',
			notice: req.session.user + ' is logged-in successfully.' });
});

router.get('/register', function(req, res, next) {
	if (!req.session.user)
		res.render('register', { title: 'Sign Up' });
	else
		res.redirect('/users/dashboard');
});

router.post('/signup', function(req, res, next) {
	validateUser(req);
	errors = req.validationErrors();
	if (errors) {
		res.render('register', { errors: errors });
    return;
	} else {
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(req.body.password, salt, function(err, encrypted_password) {
				var newUser = { username: req.body.username,
										 		email: req.body.email,
										 		password: encrypted_password };
				User = req.app.models.user;
				User.create(newUser)
					.then(function () {
						req.session.user = newUser.username;
						res.redirect('/users/dashboard');
		      }).catch(function (err) {
		        res.render('register');
		      });
			});
		});
	}
});

// move this code to User model
var validateUser = function (req) {
	req.checkBody({
	 'email': {
	    notEmpty: true,
	    isEmail: {
	      errorMessage: 'Invalid Email'
	    }
	  },
	  'password': {
	    notEmpty: true,
	    errorMessage: 'Password can\'t be blank'
	  },
	  'confirm_password': {
	    notEmpty: true,
	    errorMessage: 'Confirmation Password can\'t be blank'
	  },
	  'username': {
	  	notEmpty: true,
	    errorMessage: 'Username can\'t be blank'
	  }
	});
}

module.exports = router;
