var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require("./config.js");

//Mongo DB
const mongoose = require('mongoose');
const uri = `mongodb+srv://${config.DB_USER_NAME}:${config.DB_PASSWORD}@cluster0.c8ayw.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(uri).then().catch( err=> {
  console.log(err);
  console.log('error to connect to mongodb');
});

//Routers
var indexRouter = require('./routes/indexRouter');
var userRouter = require('./routes/usersRouter');
var sessionRouter = require('./routes/sessionsRouter');
var customerRouter = require('./routes/customerRouter');
var siteRouter = require('./routes/siteRouter');
var monitorUptimeRouter = require('./routes/monitorUptimeRouter');
var monitorSpeedRouter = require('./routes/monitorSpeedRouter');

//Middleware
const checkIfAdminIsAuth = require('./lib/middlewares/checkIfAdminIsAuth');

//API Security
const passport = require('passport');
require('./initializers/passport');
var cors = require('cors');

var app = express();

var cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  secret: 'Pinggy1234',
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: ['']
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(checkIfAdminIsAuth);
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/sessions', sessionRouter);

//TOKEN REQUIRED
//A routers that needs auth to access
app.use(passport.authenticate('jwt', { session: false }));

app.use('/api/customers', customerRouter);
app.use('/api/sites', siteRouter);
app.use('/api/monitorUptime', monitorUptimeRouter);
app.use('/api/monitorSpeed', monitorSpeedRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //console.log(res);
  res.send(err.message);
});

module.exports = app;
