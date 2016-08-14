const expect = require('chai').expect;

eval(process.env.code);

describe('Hello World', function () {
	it('says hello', function () {
		expect(something()).to.equal('Hello World');
	});
});

// code="function something () {return 'Hello World';};" ./node_modules/mocha/bin/mocha --grep "Hello World"


// runs test on docker, passes test
// docker run --rm --user=netuser --net=none --cap-drop all meredithroman/thisisfine:node node main.js --code="function something () {return 'Hello World';};"

// docker run -t -i --rm --user=netuser --net=none --cap-drop all meredithroman/thisisfine:node bash

// docker build -t meredithroman/thisisfine:node ./docker/node