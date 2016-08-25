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

    return Promise.map(users, function(userObj) {
        return User.create(userObj);
    });

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
    /*{
        title: 'Hello World',
        language: 'node',
        description: 'Print "Hello World" to the console',
        examples: 'Use console.log',
        level: 2,
        pathId: 1
    },*/
    {
        title: 'Intro to Variables',
        language: 'node',
        description: 'Variables are containers that hold values.</p><p>Create three variables called <code>x</code>, <code>y</code>, and <code>z</code>.  The value of <code>x</code> should be the number 1; <code>y</code> should be 2; and <code>z</code> should have the word "foo".',
        examples: '<code>var monkey = "Awesome";</code>',
        level: 2,
        pathId: 1
    },
    {
        title: 'Let\'s Do Some Math!',
        language: 'node',
        description: 'JavaScript is good at math.  Define five variables:</p><ol><li><code>plus</code> should add 2 + 2</li><li> <code>minus</code> should equal 3 - 5</li><li><code>times</code> should be 8 * 2</li><li><code>divided</code> should be 12/6 </li><li><code>mod</code> (modulo) should equal the remainder of 12 divided by 5. (the symbol for modulo is <code>%</code>)</li>',
        examples: '<code>var twice = 1 * 2;</code>',
        level: 2,
        pathId: 1
    },
    {
        title: 'Booleans',
        language: 'node',
        description: 'The words <code>true</code> and <code>false</code> (without quotes) are special values in JavaScript called Booleans.</p><p>Create variables called <code>thisIsTrue</code> and <code>thisIsFalse</code> and assign them the values of true and false.',
        examples: '<code>thisIsTrue</code> should be <code>true</code>.',
        level: 2,
        pathId: 1
    },
    {
        title: 'Functions with Side Effects',
        language: 'node',
        description: 'Functions have "side effects" if they change an outside value.</p> <p>Start by assigning the variable <code>num</code> the value of 1.  Then, write a function called <code>addOne</code> that increases <code>num</code> by 1 each time it is run.',
        examples: '<code>var x = 1000; <br>function makeXEqualZero() {<br>&nbsp;&nbsp;x = 0; <br>}</code>',
        level: 3,
        pathId: 1
    },
    {
        title: 'Functions that Return Values',
        language: 'node',
        description: 'Functions can return a value, which may be used in another part of your code.</p><p>Write a function called <code>returnsHello</code> that returns the string <code>Hello</code>.',
        examples: '<code>function getOne() {<br>&nbsp;&nbsp;return 1; <br>}</code>',
        level: 3,
        pathId: 1
    },
    {
        title: 'Assign the Results of a Function to a Variable',
        language: 'node',
        description: 'You can set a variable equal to a function call - the variable\'s value will be whatever the function returns.</p> <p>Create a function called <code>returnsOne</code> that returns the number 1.</p> <p>Now declare a variable called <code>one</code> and assign it to the function call getOne().  The variable will now equal 1!',
        examples: '<code>var getAge = function () {<br>&nbsp;&nbsp;lastYearsAge += 1; <br>}</p> <p>var myAge = getAge();</code>',level: 3,
        pathId: 1
    },{
        title: 'Welcome to JavaScript Arrays',
        language: 'node',
        description: '',
        examples: '',
        level: 1,
        pathId: 2,
        startCode: 'var array = [1, 2, 3, 4]\n\n'
    },{
        title: 'Array.prototype.push',
        language: 'node',
        description: 'The Array prototype comes with a variety of methods built in, meaning you can call them on any array. </p><p>The variable <code>array</code> has been assigned for you.  Use the array method <code>.push()</code> to add the number <code>5</code> to the end of the array.',
        examples: '<code>[].push("Hello")</code> results in <code>["Hello"]</code>',
        level: 2,
        pathId: 2,
        startCode: 'var array = [1, 2, 3, 4]\n\n'
    },{
        title: 'Array.prototype.pop',
        language: 'node',
        description: 'The method <code>.pop()</code> removes the last value and returns it.  </p> Set the variable <code>popped</code> to equal the last value in the <code>array</code> using <code>.pop()</code> The array length should now have 3 items.<p>',
        examples: 'Remember that <code>pop</code> returns the value it removes, so you can assign that value to a variable.',
        level: 2,
        pathId: 2,
        startCode: 'var array = [1, 2, 3, 4]\n\n'
    },{
        title: 'Array.prototype.shift',
        language: 'node',
        description: 'The method <code>.shift()</code> works like <code>.pop()</code>, except that removes the first item in the array.  </p><p>Set <code>shifted</code> to the first array value, removing the first value in the array.',
        examples: 'Remember that <code>shift</code> returns the value it removes, so you can assign that value to a variable.',
        level: 2,
        pathId: 2,
        startCode: 'var array = [1, 2, 3, 4]\n\n'
    },{
        title: 'Array.prototype.concat',
        language: 'node',
        description: 'You can combine two or more arrays using <code>.concat()</code>.  Each array will be added to the end of the original array. </p><p>Concatenate the array [5,6,7] to the given <code>array</code> variable.',
        examples: 'Your <code>array</code> should now be [1,2,3,4,5,6,7].',
        level: 3,
        pathId: 2,
        startCode: 'var array = [1, 2, 3, 4]\n\n'
    },{
        title: 'Array.prototype.filter',
        language: 'node',
        description: 'The <code>.filter()</code> method takes in a testing function.  It passes each array value into the function you specify. If the function returns <code>true</code>, it keeps that value.  <code>.filter()</code> doesn\'t change the original array, but returns a new one with only the <code>true</code> values.  </p><p>Using <code>.filter()</code>, set the variable <code>newArray</code> to contain all the even numbers in <code>array</code>.',
        examples: 'Remember to pass in a function that returns true for an even number.  You can use <code>%2</code> to test if a number is divisible by two.',
        level: 3,
        pathId: 2,
        startCode: 'var array = [1, 2, 3, 4]\n\n'
    },{
        title: 'Array.prototype.forEach',
        language: 'node',
        description: 'The method <code>.forEach()</code> takes in a function that you want to execute for each value in an array. It returns an array of the results.</p><p>Using <code>.forEach()</code>, return an array where every value is 1 more than the original array value.',
        examples: 'Pass in a function that takes a value and returns the value plus 1.',
        level: 3,
        pathId: 2,
        startCode: 'var array = [1, 2, 3, 4]\n\n'
    }];

    return Promise.mapSeries(challenges, function (challenge) {
        return Challenge.create(challenge);
    });

};
var seedUserChallenges = function() {

    var userChallenges = [
    {
        complete: true,
        userCode: "console.log('helo world')",
        userId: 2,
        challengeId: 1
    },
    {
        complete: true,
        userCode: "var x = 1; var y = 2; var z = 'foo'",
        userId: 2,
        challengeId: 2
    },
    {
        complete: false,
        userCode: "var add = 'I have no idea what I am doing';",
        userId: 2,
        challengeId: 3
    },
    {
        complete: true,
        userCode: "console.log('Hello World')",
        userId: 2,
        challengeId: 8
    },
        {
        complete: true,
        userCode: "console.log('Hello World')",
        userId: 2,
        challengeId: 9
    },]

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
    }/*, {
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
                    ", {
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
    }id": 0,
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
    }*/];

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
/*    .then(function() {
        return seedUserChallenges();
    })*/
    .then(function() {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function(err) {
        console.error(err);
        process.exit(1);
    });
