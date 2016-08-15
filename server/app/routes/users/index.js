'use strict';
var router = require('express').Router();
var User = require('../../../db/models/user');
// var utils = require('./utils')

router.get('/',  function (req, res, next) {
  if (req.user.isAdmin)
  {User.findAll()
    .then(function (userArr) {
      res.send(userArr)
    })
    .catch(next);
  }
  else res.sendStatus(403)
});

router.get('/:userId', function (req, res, next) {
  console.log(req.user,"baby.")
  if (req.user.id===+req.params.userId || req.user.isAdmin){
    User.findOne({where: {id: req.params.userId}})
    .then(function(user){
      res.send(user);
    })
    .catch(next);
  }
  else{
    res.sendStatus(401);
  }
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

router.post('/', function (req, res, next) {
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
