'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

var userChallenge = db.define('user_challenge', {
    complete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    dateCompleted: {
        type: Sequelize.DATE,
        defaultValue: null
    },
    userCode: {
        type: Sequelize.TEXT,
    },
});

module.exports = userChallenge;