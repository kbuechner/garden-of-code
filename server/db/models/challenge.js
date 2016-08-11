'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

var Challenge = db.define('challenge', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,

    },
    examples: {
        type: Sequelize.TEXT,

    },
    level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
});

module.exports = Challenge;