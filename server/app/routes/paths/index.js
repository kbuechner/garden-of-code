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

router.get('/:id', function(req, res, next) {
	let id = req.params.id;
	Path.findById(id)
	.then(function (path) {
		if (!path) res.status(404).send();
		else res.send(path);
	})
	.catch(next);
});

// get all challenges by path
	// api/paths/pathId (all of the challenges for the path)

// get all paths
	// api/paths/

module.exports = router;
