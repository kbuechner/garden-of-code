'use strict';
var router = require('express').Router();
var User = require('../../../db/models/user');
var Challenge = require('../../../db/models/challenge');
var UserChallenge = require('../../../db/models/user-challenge')
var Path = require('../../../db/models/path')
var Promise = require('bluebird')

router.get('/', function(req, res, next) {
  UserChallenge.findAll()
    .then(function(userChallenges) {
      res.send(userChallenges)
    })
    .catch(next);
});

router.get('/:userId/challenges', function(req, res, next) {
  UserChallenge.findAll({
    where: {
      userId: req.params.userId
    }
  })
    .then(function(challenges) {
      res.send(challenges);
    })
    .catch(next);
});

router.get('/:userId/path/:pathId', function(req, res, next) {
  UserChallenge.findAll({
    where: {
      userId: req.params.userId,
      pathId: req.params.pathId
    }
  })
    .then(function(res) {
      if (res) {
        res.send(res.data);
      } else {
        res.status(404).send('This user has no active challenges for this path')
      }
    })
    .catch(next);
});

router.post('/', function(req, res, next) {
  
})

module.exports = router;