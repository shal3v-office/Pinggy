const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const isLoggedIn = require('../lib/middlewares/isLoggedIn');



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/new', { user: new User() });
});

/* Add user by admin */
router.get('/newByAdmin', isLoggedIn , function(req, res, next) {
  res.render('users/newByAdmin.ejs', { user: req.user, isAdmin: res.locals.isAdmin });
});


//register
router.post('/', isLoggedIn ,async function(req, res, next) {
  console.log(req.body);
  
  try {
    let user = new User(req.body);
    console.log(res.locals.isAdmin);
    if(res.locals.isAdmin == false) throw new Error('only admin has permission to add user');
    var userInDB = await User.findOne({'email':user.email});
    if (userInDB == null){
      await user.save();
    }
    else {
      user = userInDB;
    }
    
  } catch (err) {
    //return res.render('users/new', { user });
    return next(err);
  }

  req.session.userid = user.id;
  //res.redirect('users/screen');
  res.send(user);

});

//register by admin
router.post('/newByAdmin/', isLoggedIn ,async function(req, res, next) {
  console.log(req.body);
  
  try {
    let user = new User(req.body);
    console.log(res.locals.isAdmin);
    if(res.locals.isAdmin == false) throw new Error('only admin has permission to add user');
    var userInDB = await User.findOne({'email':user.email});
    if (userInDB == null){
      await user.save();
    }
    else {
      user = userInDB;
    }
    res.send(200);
  } catch (err) {
    //return res.render('users/new', { user });
    return next(err);
  }

  req.session.userid = user.id;
  //res.redirect('users/screen');
  res.send(user);

});

router.get('/screen' , async function(req, res, next) {
  res.render('users/index', { title: 'HAMEAMENET', user: req.user });
});

router.get('/token' , function(req, res, next) {
  console.log(req.user);
  res.render('users/token', { token: null });
});

router.post('/token' ,async function(req, res, next) {
  console.log("hi from post token");
  user = req.user;
    if (!user.token) {
      //create token
      const token = jwt.sign(
        { id: user._id },
        'Hamehamenet1234'
      );

      try {
        //save token to user details
        var userToSend = await User.findByIdAndUpdate(user._id, {token: token});
        res.render('users/token', { token });
        //res.send({token});
      } catch (error) {
        console.log("error");
        return next(error);
      }
    }
    else {
      let token = user.token;
      res.render('users/token', { token });
      //res.send({token});
    }
});


//change password, get in the body user object
router.post('/changePassword', isLoggedIn , async function(req, res, next) {
  let user = new User(req.body);
  try {

    if(res.locals.isAdmin == false) throw new Error('only admin has permission to changePassword');
    
    let userInDB = await User.findOneAndUpdate({'email':user.email},{'password':user.password},{
      returnOriginal: false
    });
    
    if (userInDB == null) throw new Error('can update password only to exist user');

    //req.session.userid = user.id;
    //res.redirect('users/screen');

    res.send(user);
  
  } catch (err) {
    //return res.render('users/new', { user });
    return next(err);
  }

 
});
module.exports = router;