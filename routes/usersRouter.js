const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const isLoggedIn = require('../lib/middlewares/isLoggedIn');


//register
router.post('/'/*, isLoggedIn*/ ,async function(req, res, next) {
  console.log("--------- create user --------");
  let user = null;
  try {
    user = new User(req.body);
    //if(res.locals.isAdmin == false) throw new Error('only admin has permission to add user');
    var userInDB = await User.findOne({'email':user.email});
    if (userInDB == null){
      await user.save();
    }
    else {
      user = userInDB;
    }
    
  } catch (err) {
    return next(err);
  }

  req.session.userid = user.id;
  res.send(user);

});

router.post('/token' ,async function(req, res, next) {
  let user = await User.findOne({'email':req.body.email});
  if(user && await user.checkPassword(req.body.password)) {
    //create token
    const token = jwt.sign(
      { id: user._id },
      'Pinggy1234'
    );

    try {
      //res.render('users/token', { token });
      res.send({token});
    } catch (error) {
      return next(error);
    }
  } else {
    //res.render('users/token');
    res.send("error");
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

    res.send(user);
  
  } catch (err) {

    return next(err);
  }

 
});
module.exports = router;