'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let config = require('../config');

let schema = new Schema({
  word: {
    type: String,
    required: true
  },
  opportunities: {
    type: Number,
    required: true
  }
});

mongoose.model('Game', schema);
