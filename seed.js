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
        description: 'We can print information in the console by using console.log.  As your code gets more complex, logging is very useful for finding bugs in your program. \nTry it out: log out the phrase "Hello World"!',
        examples: 'console.log("Message")',
        level: 2,
        pathId: 1
    },
    {
        title: 'Variables',
        language: 'node',
        description: 'Variables are containers that hold values.  \nCreate three variables called x, y, and z.  The value of x should be the number 1; y should be 2; and z should have the word "foo".',
        examples: 'var monkey = "Awesome"',
        level: 2,
        pathId: 1
    },
    {
        title: 'Numbers and Math',
        language: 'node',
        description: 'JavaScript is good at math. \n\nDefine five variables: \n1) "plus" should add 2 + 2, \n2) "minus" should equal 3 - 5, \n3)"times" should be 8 * 2, \n4)"divided" should be 12/6 and \n5)"mod" (aka modulo) should equal the remainder of 12/5. (Hint: the symbol for modulo is %)',
        examples: 'Mathy math',
        level: 2,
        pathId: 1
    },
    {
        title: 'Functions with side effects',
        language: 'node',
        description: 'Functions have "side effects" if they change an outside value. \n\nStart by assigning the variable "num" the value of 1.  Then, write a function called "addOne" that increases num by 1 each time it is run.',
        examples: 'var x = 1000; \nfunction makeXEqualZero() {\nx = 0; \n}',
        level: 3,
        pathId: 1
    },
    {
        title: 'Functions that return values',
        language: 'node',
        description: 'Functions can return a value, which may be used in another part of your code.  \n\nWrite a function called "returnsHello" that returns the string "Hello".',
        examples: 'function getOne() {\nreturn 1; \n}',
        level: 3,
        pathId: 1
    },
    {
        title: 'Saving function results',
        language: 'node',
        description: 'You can set a variable equal to a function - the variable\'s value will be whatever the function returns. \n\nCreate a variable called "one" and assign it a function that returns the number 1.  The variable will now equal 1!',
        examples: 'var myAge = function () {\nlastYearsAge += 1; \n}',
        level: 3,
        pathId: 1
    },
    {
        title: 'Booleans',
        language: 'node',
        description: 'The words "true" and "false" (without quotes) are special values in JavaScript called Booleans.  Create variables called "thisIsTrue" and "thisIsFalse" and assign them the values of true and false.',
        examples: 'thisIsTrue should be true.',
        level: 4,
        pathId: 1
    },
    {
        title: 'Add an element to an array.',
        language: 'node',
        description: 'In Javascript, you can use several methods to add something to an array. here are some examples. Try it out yourself.',
        examples: 'use .push()',
        level: 1,
        pathId: 2
    },{
        title: 'Find an element in an array.',
        language: 'node',
        description: 'In Javascript, you can use several methods to find something in an array. here are some examples. Try it out yourself.',
        examples: 'use .indexOf()',
        level: 1,
        pathId: 2
    },{
        title: 'Remove an element from an array.',
        language: 'node',
        description: 'In Javascript, you can use several methods to remove something from an array. here are some examples. Write a function that takes an array, removes the last element, and returns the new array.',
        examples: 'Try .pop()',
        level: 2,
        pathId: 2
    },];

    return Promise.mapSeries(challenges, function (challenge) {
        return Challenge.create(challenge);
    });

};
var seedUserChallenges = function() {

    var userChallenges = [
    {
        complete: false,
        userCode: "console.log('helo world')",
        userId: 2,
        challengeId: 1
    },
    {
        complete: true,
        userCode: "",
        userId: 2,
        challengeId: 2
    }
    ];

    return Promise.map(userChallenges, function(userChallengeObj){
        return UserChallenge.create(userChallengeObj);
    });

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

    return Promise.map(paths, function(pathObj) {
        return Path.create(pathObj);
    });

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
