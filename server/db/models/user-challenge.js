'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');
var Challenge = db.model('challenge');

module.exports = db.define('user_challenge', {
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
}, {
    hooks: {
        beforeUpdate: function(userchallenge) {
            if (userchallenge.complete) userchallenge.dateCompleted = new Date().toString()
        }
    }
});
