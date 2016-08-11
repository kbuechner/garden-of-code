'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');
var User = db.require('./user')
var Challenge = db.require('./challenge')

var userChallenge = db.define('userChallenge', {
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