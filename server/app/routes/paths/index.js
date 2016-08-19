'use strict';
const router = require('express').Router();
const db = require('../../../db');
const Path = db.model('path');

router.get('/', function(req, res, next) {
	Path.findAll({})
	.then(function (paths) {
		res.send(paths);
	})
	.catch(next)
});

router.get('/:pathId', function(req, res, next) {
	let id = req.params.pathId;
	Path.findById(id)
	.then(function (path) {
		if (!path) res.status(404).send();
		else res.send(path);
	})
	.catch(next);


});

router.get('/:pathId/challenges', function (req, res, next){
	Path.scope('allChallenges').findAll({
		where: {
			id: req.params.pathId
		}
	})
	.then(function(path){
		res.send(path)
	})
	.catch(next);
});

module.exports = router;
