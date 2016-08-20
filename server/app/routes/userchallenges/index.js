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

router.get('/:userId/challenges/:challengeId', function(req, res, next){
  UserChallenge.findAll({
    where: {
      userId: req.params.userId,
      challengeId: req.params.challengeId
    }
  })
  .then(function(challenge){
    res.send(challenge)
  })
  .catch(next)
})

router.post('/:userId/challenges/:challengeId', function(req, res, next){
  UserChallenge.findOrCreate({
    where: {
      userId: req.params.userId,
      challengeId: req.params.challengeId
    }
  })
  .then(function (challenge){
    // find or create returns an array containing the instance 
    challenge = challenge[0]
    return challenge.update(req.body)
  })
  .then(function (challenge){
    res.send(challenge);
  })
  .catch(next)
})

// view all challenges I've done in a path
router.get('/:userId/path/:pathId', function(req, res, next) {
  Path.findOne({
    where: {id: req.params.pathId},
    include: [ Challenge ]
    })
  .then(function (path) {
    let userChallengePromises = path.challenges.map(function (challenge) {
      return UserChallenge.findOne({
        where: {
          userId: req.params.userId,
          challengeId: challenge.id
        }
      })
    });
    return Promise.all(userChallengePromises)
  })
  .then(function (userChallenges) {
    // filter out some null objects
    userChallenges = userChallenges.filter(function (usrChal) {
      return usrChal;
    });
    if (userChallenges.length) res.send(userChallenges);
    else res.status(404).send('This user has no active challenges for this path')
  })
  .catch(next);

});

module.exports = router;