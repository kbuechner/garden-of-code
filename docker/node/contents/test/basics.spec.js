const expect = require('chai').expect;
const stdout = require("test-console").stdout;

eval(process.env.code);

// challenge solution:
// console.log('Hello World');

/*describe('Hello World', function () {

	eval(process.env.code);

	let output = stdout.inspectSync(function() {
		eval(process.env.code);
	});

	it('says hello', function () {
		expect(output[0]).to.equal('Hello World\n');
	});

});*/

// challenge solution:
// var x = 1; var y = 2; var z = 'foo';
// NB: currently typing code into text 
// input, can only have one, need 
// semicolons to get the test to pass

// NEED TO CHECK FOR CORRECT VARIABLE REVIEW

describe('Intro to Variables', function () {

	it('variables have the correct values', function () {
		expect(x).to.equal(1);
		expect(y).to.equal(2);
		expect(z).to.equal('foo');
	});

});

// challenge solution:
// var plus = 2 + 2; var minus = 3 - 5; var times = 8 * 2; var divided = 12 / 6; var mod = 12 % 5;

describe('Let\'s Do Some Math!', function () {

	it('variables have the expected values', function () {
		expect(plus).to.equal(2 + 2)
		expect(minus).to.equal(3 - 5)
		expect(times).to.equal(8 * 2)
		expect(divided).to.equal(12 / 6)
		expect(mod).to.equal(12 % 5)
	});

	// passes if there is at least one match for each
	it('the correct operators were used', function () {
		expect(process.env.code.match(/\+/)).to.not.be.false;
		expect(process.env.code.match(/\-/)).to.not.be.false;
		expect(process.env.code.match(/\*/)).to.not.be.false;
		expect(process.env.code.match(/\//)).to.not.be.false;
		expect(process.env.code.match(/\%/)).to.not.be.false;
	});

});

// challenge solution:
// var num = 1; function addOne () {num++}

describe('Functions with Side Effects', function () {

	it('addOne function increments num', function () {
		expect(num).to.equal(1);
		addOne();
		expect(num).to.equal(2);
	});

});

// challenge solution:
// function returnsHello () {return 'Hello';}

describe('Functions that Return Values', function () {

	it('returns the string "Hello"', function () {
		expect(returnsHello()).to.equal('Hello');
	});

});

// challenge solution:
// function returnsOne () {return 1;}; var one = returnsOne()

describe('Assign the Results of a Function to a Variable', function () {

	it('the variable is equal to the return value of the function', function () {
		expect(returnsOne()).to.equal(one);
	});

});

// challenge solutions:
// var thisIsTrue = true; var thisIsFalse = false;

describe('Booleans', function() {

	it('true is true and false is false', function () {
		expect(thisIsTrue).to.be.true;
		expect(thisIsFalse).to.be.false;
	});

});
