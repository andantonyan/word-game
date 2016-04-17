'use strict';

let _ = require('lodash');

const createConfig = function() {
  let env = process.env.NODE_ENV || 'development';
  let config = require('./config');
  config = _.extend(config.env[env], config.main);
  config.env = env;
  return config;
};

module.exports = createConfig();
