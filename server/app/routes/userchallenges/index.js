'use strict';
var router = require('express').Router();
var User = require('../../../db/models/user');
var Challenge = require('../../../db/models/challenge');
var UserChallenge = require ('../../../db/models/userchallenge')
var Promise = require('bluebird')

router.get('/',  function (req, res, next) {
  {UserChallenge.findAll()
    .then(function (userChallenges) {
      res.send(userChallenges)
    })
    .catch(next);
  }
  else res.sendStatus(403)
});

router.get('/users/:userId', function (req, res, next) {
  UserChallenge.findAll({
    where: {
      userId: req.params.userId
    }
  })
  .then(function (userChallenges) {
    res.send(userChallenges);
  })
  .catch(next);
});

router.get('/username/:paths', function (req, res, next) {
  User.findAll({where: {userName: {$iLike: req.params.uName}}})
  .then(function(user){
    if(user) {res.send(user); }
    else {res.status(404).send('No user found') }
  })
  .catch(next);
});

// router.get('/:userId/challenges',utils.ensureAuthenticated,function(req,res,next){
//   Challenge.findAll({where: {userId: req.params.userId}})
//   .then(function(orders){
//     if(utils.ensureAdminOrSameUser(req,orders[0])){
//       res.send(orders);
//     } else{
//       res.sendStatus(401);
//     }
//   })
//   .catch(next);
// });

router.post('/', function (req, res, next) {debugger;
  console.log(Object.keys(req.body))
  if (!req.body.name) {req.body.name = req.body.userName}
  User.findOne({
            $or: [
                { email: req.body.email },
                { userName: req.body.userName }
          ]
  })
  .then(function (user) {
    if (user && user.email === req.body.email) {
      res.status(409).send("There is already an account with this email");
      return;
    }
    else if (user && user.userName === req.body.userName) {
      res.status(409).send("This user name is already taken. Please choose again.");
      return;
    }
    else
      User.create(req.body)
      .then(function(createdUser){
        res.status(201).send(createdUser);
      })
  })
});

router.put('/:userId', function (req, res, next) {
  if (req.user.id===+req.params.userId || req.user.isAdmin) {
    // console.log("PUT route >>>>>>> ",req.params.userId)
    User.findById(req.params.userId)
    .then(function(userInstance){
      return userInstance.update(req.body)
    })
    .then(function (userUpdated) {
      res.status(201).send(userUpdated)
    })
    .catch(next);
  }
  else(function () {
    res.sendStatus(401)
  });
});

// router.delete('/:userId', utils.ensureAdmin, function (req, res, next) {
//   User.findOne({where: {id: req.params.userId}})
//   .then(function(user){
//     return user.destroy()
//   })
//   .catch(next);
// });

module.exports= router;