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

/*router.param('pathId', function (req, res, next, id) {
	Path.findById(id)
	.then(function (path) {
		if (!path) res.status(404).send();
		req.track = path; // req.path is already a thing so I'm confusingly calling a path a "track" here
		next();
		return null;
	})
	.catch(next);
})*/

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
	/*req.track.allChallenges()
	.then(function (challenges) {
		res.json(challenges);
	})
	.catch(next);*/

	Path.scope('allChallenges').findAll({
		where: {
			id: req.params.pathId
		}
	})
	.then(function(path){
		res.send(path)
	})
	.catch(next);

})

// get all challenges by path
	// api/paths/pathId (all of the challenges for the path)

// get all paths
	// api/paths/

module.exports = router;
