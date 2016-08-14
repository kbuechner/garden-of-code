const expect = require('chai').expect;
const stdout = require("test-console").stdout;

// challenge solution:
// console.log('Hello World');

describe('Hello World', function () {

	let output = stdout.inspectSync(function() {
		eval(process.env.code);
	});

	it('says hello', function () {
		expect(output[0]).to.equal('Hello World\n');
	});

});
