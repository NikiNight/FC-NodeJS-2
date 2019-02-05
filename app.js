const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const winston = require('winston');
//const session = require("express-session");

const bodyParser = require('body-parser');
const session = require('cookie-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const newsRouter = require('./routes/news');
const User = require('./server/schema').User;

const app = express();

passport.use(new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password'
  },
  function (username, password, done) {
      User.findOne({ login: username }, function (err, user, next) {
          if (err) {
              next(err);
              return done(err);
          }
          if (!user) {
              return done(null, false, { message: 'Login is incorrect' });
          }
          if (!user.verifyPassword(password, user.password)) {
              return done(null, false, { message: 'Passord is incorrect' });
          }
          return done(null, user);
      });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  User.findOne({ login: user.login }, function (err, user) {
      if (err) { return done(err); }
      done(null, user);
  });
});

//Logging setup
winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'history.log'})
  ]
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next){
  winston.info({date: new Date(), url: req.get('host') + req.originalUrl});
  next();
});

//Start session
app.use(session({ secret: 'SECRET' }))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "./views"));

app.use('/', newsRouter);

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
  res.render('error2');
});

module.exports = app;
