'use strict';

let express = require('express');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
let config = require('./config');
let path = require('path');
let fs = require('fs');
let util = require('util');
let modelsPath = path.join(__dirname, 'models');
let modelsPathFiles = fs.readdirSync(modelsPath);
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let mongoose = require('mongoose');
let app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.db);

modelsPathFiles.forEach((file) => {
  require(modelsPath + '/' + file);
  console.log(`initialized model: ${file}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use( (err, req, res, next) => {
  let bodyParserFailureErrorMsg = 'Unable to parse HTTP body- error occurred :: ' +
    util.inspect((err && err.stack) ? err.stack: err, false, null);
  return res.status(400).send(bodyParserFailureErrorMsg);
});

app.use(expressValidator({
  errorFormatter: (param, message) => {
    let err = {};
    err[param] = message;
    return err;
  },
  customValidators: {
    isMongoIdsArray: (value) => {
      return Array.isArray(value) && value.reduce((prev, id) => {
          return prev && expressValidator.validator.isMongoId(id);
        }, true);
    },
    isInArray: (value, list) => {
      list = list || [];
      return ~list.indexOf(value);
    }
  }
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Expose-Headers', 'X-Auth-Token');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, X-Auth-Token');

  if ('OPTIONS' === req.method) {
    return res.status(200).end();
  }

  next();
});

let routes = require('./routes/index');
let game = require('./routes/game');

app.use('/', routes);
app.use('/api/game', game);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
