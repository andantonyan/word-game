'use strict';

module.exports = {
  env: {
    development: {
      db: 'mongodb://localhost:27017/word-game',
      port: process.env.PORT || 3000
    },
    production: {
      db: process.env.MONGOLAB_URI,
      host: '',
      port: process.env.PORT
    },
    staging: {
      db: process.env.MONGOLAB_URI,
      port: process.env.PORT
    }
  },
  main: {

  }
};
