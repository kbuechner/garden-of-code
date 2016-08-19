/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Challenge = db.model('challenge');
var UserChallenge = db.model('user_challenge');
var Path = db.model('path');

var Promise = require('sequelize').Promise;

var seedUsers = function() {

    var users = [{
        email: 'testing@fsa.com',
        password: 'password',
        userName: 'fsa',
        name: 'fullstack academy'
    },{
        email: 'obama@gmail.com',
        password: '123',
        userName: 'POTUS',
        name: 'barak'
    }, ];

    var creatingUsers = users.map(function(userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};
var seedChallenges = function() {

    var challenges = [
    {
        title: 'Welcome to JavaScript!',
        language: 'node',
        description: 'JavaScript is the most commonly used programming language on the web. Learn all about it here!',
        examples: null,
        level: 1,
        pathId: 1
    },
    {
        title: 'Print a string to the console',
        language: 'node',
        description: 'Print "Hello World" to the console',
        examples: 'Use console.log',
        level: 2,
        pathId: 1
    },
    {
        title: 'Variables',
        language: 'node',
        description: 'Assign things to variables',
        examples: 'x = 1',
        level: 2,
        pathId: 1
    },
    {
        title: 'Numbers and Math',
        language: 'node',
        description: 'Do some math',
        examples: 'Mathy math',
        level: 2,
        pathId: 1
    },
    {
        title: 'Functions',
        language: 'node',
        description: 'Functions with side effects',
        examples: 'no examples for you',
        level: 3,
        pathId: 1
    },
    {
        title: 'Functions that return values',
        language: 'node',
        description: 'Functions can return things',
        examples: 'no examples here either',
        level: 3,
        pathId: 1
    },
    {
        title: 'Assign the results of a function to a variable',
        language: 'node',
        description: 'Blah blah blah',
        examples: 'blah blah',
        level: 3,
        pathId: 1
    },
    {
        title: 'Booleans',
        language: 'node',
        description: 'True and False, 0 and 1, all that binary stuff',
        examples: 'true & false',
        level: 4,
        pathId: 1
    },
    {
        title: 'Add an element to an array.',
        language: 'node',
        description: 'In Javascript, you can use several methods to add somthing to an array. here are some examples. Try it out yourself.',
        examples: 'use .push()',
        level: 1,
        pathId: 2
    },{
        title: 'Add an element to an array.',
        language: 'node',
        description: 'In Javascript, you can use several methods to find somthing in an array. here are some examples. Try it out yourself.',
        examples: 'use .indexOf()',
        level: 1,
        pathId: 2
    },{
        title: 'remove an element to an array.',
        language: 'node',
        description: 'In Javascript, you can use several methods to remove somthing from an array. here are some examples. Try it out yourself.',
        examples: 'use .pop()',
        level: 2,
        pathId: 2
    },];

    var creatingChallenges = challenges.map(function(challengeObj) {
        return Challenge.create(challengeObj);
    });

    return Promise.all(creatingChallenges);

};
var seedUserChallenges = function() {

    var userChallenges = [ ];

    var creatingUserChallenges = userChallenges.map(function(userChallengeObj) {
        return UserChallenge.create(userChallengeObj);
    });

    return Promise.all(creatingUserChallenges);

};
var seedPaths = function() {

    var paths = [{
        name: 'JavaScript Basics',
        description: 'Learn the basics of programming using JavaScript!',
        plant: null // don't know how this works, don't need it right now
    },{
        name: 'Arrays',
        description: 'Learn all about Arrays!',
        plant: [{
                "id": "57ae219f14d63b53fc330d45",
                "friends": [{
                    "id": 0,
                    "name": "Talley Hammond"
                }, {
                    "id": 1,
                    "name": "Irene Finley"
                }, {
                    "id": 2,
                    "name": "Margarita Richardson"
                }],
                "greeting": "Hello, undefined! You have 10 unread messages.",
                "favoriteFruit": "strawberry"
            }, {
                "id": "57ae219f759685658d2573ec",
                "friends": [{
                    "id": 0,
                    "name": "Hensley Nguyen"
                }, {
                    "id": 1,
                    "name": "Helga Grimes"
                }, {
                    "id": 2,
                    "name": "Hannah Workman"
                }],
                "greeting": "Hello, undefined! You have 8 unread messages.",
                "favoriteFruit": "apple"
            }, {
                "id": "57ae219f2328cb7ecb70ec07",
                "friends": [{
                    "id": 0,
                    "name": "Turner Alvarez"
                }, {
                    "id": 1,
                    "name": "Edwina Britt"
                }, {
                    "id": 2,
                    "name": "Greer Hubbard"
                }],
                "greeting": "Hello, undefined! You have 1 unread messages.",
                "favoriteFruit": "strawberry"
            }, {
                "id": "57ae219f71d9abb335354334",
                "friends": [{
                    "id": 0,
                    "name": "Laura Barr"
                }, {
                    "id": 1,
                    "name": "Tyler Conway"
                }, {
                    "id": 2,
                    "name": "Howell Berger"
                }],
                "greeting": "Hello, undefined! You have 7 unread messages.",
                "favoriteFruit": "strawberry"
            }, {
                "id": "57ae219f94f9191d6b2aa465",
                "friends": [{
                    "id": 0,
                    "name": "Mcmahon Roberson"
                }, {
                    "id": 1,
                    "name": "Gail Casey"
                }, {
                    "id": 2,
                    "name": "Nancy Kaufman"
                }],
                "greeting": "Hello, undefined! You have 10 unread messages.",
                "favoriteFruit": "apple"
            }, {
                "id": "57ae219f4e8f821700c089ed",
                "friends": [{
                    "id": 0,
                    "name": "Essie Torres"
                }, {
                    "id": 1,
                    "name": "Danielle Barber"
                }, {
                    "id": 2,
                    "name": "Boone Hickman"
                }],
                "greeting": "Hello, undefined! You have 3 unread messages.",
                "favoriteFruit": "strawberry"
            }],
    }, {
        name: 'Strings',
        description: 'Learn all about Strings!',
        plant: [{
                "id": "57ae219f14d63b53fc330d45",
                "friends": [{
                    "id": 0,
                    "name": "Talley Hammond"
                }, {
                    "id": 1,
                    "name": "Irene Finley"
                }, {
                    "id": 2,
                    "name": "Margarita Richardson"
                }],
                "greeting": "Hello, undefined! You have 10 unread messages.",
                "favoriteFruit": "strawberry"
            }, {
                "id": "57ae219f759685658d2573ec",
                "friends": [{
                    "id": 0,
                    "name": "Hensley Nguyen"
                }, {
                    "id": 1,
                    "name": "Helga Grimes"
                }, {
                    "id": 2,
                    "name": "Hannah Workman"
                }],
                "greeting": "Hello, undefined! You have 8 unread messages.",
                "favoriteFruit": "apple"
            }, {
                "id": "57ae219f2328cb7ecb70ec07",
                "friends": [{
                    "id": 0,
                    "name": "Turner Alvarez"
                }, {
                    "id": 1,
                    "name": "Edwina Britt"
                }, {
                    "id": 2,
                    "name": "Greer Hubbard"
                }],
                "greeting": "Hello, undefined! You have 1 unread messages.",
                "favoriteFruit": "strawberry"
            }, {
                "id": "57ae219f71d9abb335354334",
                "friends": [{
                    "id": 0,
                    "name": "Laura Barr"
                }, {
                    "id": 1,
                    "name": "Tyler Conway"
                }, {
                    "id": 2,
                    "name": "Howell Berger"
                }],
                "greeting": "Hello, undefined! You have 7 unread messages.",
                "favoriteFruit": "strawberry"
            }, {
                "id": "57ae219f94f9191d6b2aa465",
                "friends": [{
                    "id": 0,
                    "name": "Mcmahon Roberson"
                }, {
                    "id": 1,
                    "name": "Gail Casey"
                }, {
                    "id": 2,
                    "name": "Nancy Kaufman"
                }],
                "greeting": "Hello, undefined! You have 10 unread messages.",
                "favoriteFruit": "apple"
            }, {
                "id": "57ae219f4e8f821700c089ed",
                "friends": [{
                    "id": 0,
                    "name": "Essie Torres"
                }, {
                    "id": 1,
                    "name": "Danielle Barber"
                }, {
                    "id": 2,
                    "name": "Boone Hickman"
                }],
                "greeting": "Hello, undefined! You have 3 unread messages.",
                "favoriteFruit": "strawberry"
            }],
    }];

    var creatingPaths = paths.map(function(pathObj) {
        return Path.create(pathObj);
    });

    return Promise.all(creatingPaths);

};

db.sync({
    force: true
})
    .then(function() {
        return seedUsers();
    })
    .then(function() {
        return seedPaths();
    })
    .then(function() {
        return seedChallenges();
    })
    .then(function() {
        return seedUserChallenges();
    })
    .then(function() {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function(err) {
        console.error(err);
        process.exit(1);
    });