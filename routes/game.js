'use strict';
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Game = mongoose.model('Game');

router
  .post('/', function(req, res, next) {
    req.checkBody('word', 'Word is required').notEmpty();
    req.checkBody('opportunities', 'Opportunities is required').notEmpty();
    req.checkBody('opportunities', 'Opportunities must be an number').isNumeric();

    req.sanitizeBody('word').escape();

    const errors = req.validationErrors();

    if (errors) {
      res.status(400).send(errors);
      return;
    }

    let game = new Game(req.body);

    game.save()
      .then((game) => res.status(200).send(game))
      .catch(next);
  });

module.exports = router;
