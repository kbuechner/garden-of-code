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

router.param('pathId', function (req, res, next, id) {
	Path.findById(id)
	.then(function (path) {
		if (!path) res.status(404).send();
		//else res.send(path);
		req.track = path; // req.path is already a thing so I'm confusingly calling a path a "track" here
		next();
		return null;
	})
	.catch(next);
})

router.get('/:pathId', function(req, res) {
	res.send(req.track);
	
});

router.get('/:pathId/challenges', function (req, res, next){
	req.track.getChallenges()
	.then(function (challenges) {
		res.json(challenges);
	})
	.catch(next);
})

// get all challenges by path
	// api/paths/pathId (all of the challenges for the path)

// get all paths
	// api/paths/

module.exports = router;
