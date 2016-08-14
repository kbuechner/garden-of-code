const child_process = require('child_process');
const TESTS = {
	1: 'Hello World'
}

let argv = require('minimist')(process.argv.slice(2));
let code = argv.code;
let testId = argv.testId;
let command = 'code=' + '"' + code + '"' + ' ./node_modules/mocha/bin/mocha --grep "' + TESTS[testId] +'"'

child_process.exec(command, function (err, sdout, sderr) {
	if (err) console.log('aaaaaaaaaaaaaa');
	if (sderr) console.log(sderr);
	else console.log(sdout);
});

// runs test on docker, passes test
// docker run --rm --user=netuser --net=none --cap-drop all meredithroman/thisisfine:node node main.js --testId=1 --code="function something () {return 'Hello World';};"


// code="function something () {return 'Hello World';};" ./node_modules/mocha/bin/mocha --grep "Hello World"


// runs test on docker, passes test
// docker run --rm --user=netuser --net=none --cap-drop all meredithroman/thisisfine:node node main.js --code="function something () {return 'Hello World';};"

// docker run -t -i --rm --user=netuser --net=none --cap-drop all meredithroman/thisisfine:node bash

// docker build -t meredithroman/thisisfine:node ./docker/node