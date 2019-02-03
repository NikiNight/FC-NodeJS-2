var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var winston = require('winston');

var newsRouter = require('./routes/news');
var newsRouter2 = require('./routes/news2');

var app = express();

//Logging setup
winston.configure({
  transports: [
    new (winston.transports.File)({ filename: 'history.log'})
  ]
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
  winston.info({date: new Date(), url: req.get('host') + req.originalUrl});
  next();
});

//Task 1
//app.use('/', newsRouter);
//Task 2
app.use('/', newsRouter2);

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
