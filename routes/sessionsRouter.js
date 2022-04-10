var express = require('express');
var router = express.Router();
var passport = require('passport');
const User = require('../models/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('sessions/new');
});

router.post('/',
    passport.authenticate('local', {
        successRedirect: '/users/screen',
        failureRedirect: '/sessions',
        failureFlash: true
    })
);

router.post('/login', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      if (err) {
        return next(err);
      }
  
      if (!user) {
        return res.sendStatus(401);
      }
      
      return res.send(user);
  
    })(req, res, next);
});

router.post('/logout', function(req, res, next) {
    try {
      req.logout();
      //res.redirect('/users/screen');
      res.sendStatus(200);
    } catch (error) {
      return next(error);
    }
   
});
router.post('/logoutView', function(req, res, next) {
  try {
    req.logout();
    //res.redirect('/users/screen');
    res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
 
});
module.exports = router;