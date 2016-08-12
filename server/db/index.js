'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Challenge = require('./models/challenge');
var Path = require('./models/path');
var UserChallenge = require('./models/user-challenge');

User.belongsToMany(Challenge, {through: UserChallenge});
Challenge.belongsToMany(User, {through: UserChallenge});

Challenge.belongsToMany(Path, {through: 'challenge_path'});
Path.hasMany(Challenge);

User.belongsToMany(Path, {through: 'user_path'});
Path.belongsToMany(User, {through: 'user_path'});