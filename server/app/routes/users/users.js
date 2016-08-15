'use strict';
var router = require('express').Router();
var User = require('../../db/models/user');
// var utils = require('./utils')

// router.get('/', utils.ensureAdmin, function (req, res, next) {
//   User.findAll()
//   .then(function (userArr) {
//     res.send(userArr)
//   })
//   .catch(next);
// });

router.get('/:userId', function (req, res, next) {
  if (req.user.id===req.params.userId || req.user.isAdmin){
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

// router.get('/:userId/orderHistory',utils.ensureAuthenticated,function(req,res,next){
//   Order.findAll({where: {userId: req.params.userId}})
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
  User.findOne({where: {email: req.body.email}})
  .then(function (user) {
    if (user) {
      res.status(409).send("There is already an account with this email");
      return;
    }
    else
      User.create(req.body)
      .then(function(user){
        res.status(201).send(user);
      })
  })
});

router.put('/:userId', function (req, res, next) {
  if (req.user.id===req.params.userId || req.user.isAdmin) {
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
