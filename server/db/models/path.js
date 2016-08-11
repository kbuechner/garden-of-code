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
	}
	// ,
	// plantType: {
	// 	type: Sequelize.STRING,
	// },
	// plantColor: {
	// 	type: Sequelize.STRING
	// }
});
