'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/challenges', require('./challenges'));
router.use('/users', require('./users'));
router.use('/paths', require('./paths'));
router.use('/userchallenges', require('./userchallenges'));


// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
