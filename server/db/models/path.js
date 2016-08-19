var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('path', {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	description: {
		type: Sequelize.TEXT
	},
	plant: {
		//changed to JSON because data storage as a string doesn't make much sense
		//kb 8/12
		type: Sequelize.JSON,
	},
}, {
	scopes: {
		allChallenges: () => ({ // function form lets us use to-be-defined models
	      	include: [{
		        model: db.model('challenge')
			}]
		})
	}
});
