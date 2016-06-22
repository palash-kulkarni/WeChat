var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
	res.render('register', { title: 'Sign Up' });
});

router.post('/signup', function(req, res, next) {
	console.log('Blah Blah Shit');
});

module.exports = router;
