var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var io = require('socket.io')();

var routes = require('./routes/index');
var users = require('./routes/users');
var schools = require('./routes/schools');
var measures = require('./routes/measures');
var teacher = require('./routes/teacher');

var app = express();

// Hook Socket.io into Express
app.io = io;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/schools', schools);
app.use('/measures', measures);
app.use('/app', teacher);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var teacherSocket = null;
var walterSocket = null;

var setTeacherSocket = function(socket) {
  teacherSocket = socket;

  console.log('Teacher identificated');

  socket.on('message', function(data) {
    if (walterSocket) {
      walterSocket.emit('message', data);
    }
  });

  socket.on('setColor', function(data) {
    if (walterSocket) {
      walterSocket.emit('setColor', data);
    }
  });
};

var setWalterSocket = function(socket) {
  walterSocket = socket;

  console.log('Walter identificated');

  socket.on('message', function(data) {
    if (teacherSocket) {
      teacherSocket.emit('message', data);
    }
  });
};

io.on('connection', function (socket) {

  socket.emit('info', { type: 'express 4' });

  socket.on('identification', function (data) {

    if (data.device === 'teacher') {
      setTeacherSocket(socket);
    } else if (data.device === 'walter') {
      setWalterSocket(socket);
    }

  });
});




module.exports = app;
