var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (!req.session.user)
    res.render('home', { title: 'Express' });
  else
    res.redirect('/users/dashboard');
});

module.exports = router;
