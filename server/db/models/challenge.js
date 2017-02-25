'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('challenge', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    language: {
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
    startCode: {
        type: Sequelize.STRING,
    }
});