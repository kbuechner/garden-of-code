const expect = require('chai').expect;

eval(process.env.code);

// solution:
// array.push(5)

describe('Array.prototype.push', function () {

	it('has length of 5', function () {
		expect(array.length).to.equal(5);
	});

	it('the last item is 5', function () {
		expect(array[4]).to.equal(5);
	})

});

// solution:
// var popped = array.pop();

describe('Array.prototype.pop', function () {

	it('has length 3', function () {
		expect(array.length).to.equal(3);
	});

	it('the last item was removed', function () {
		expect(popped).to.equal(4);
	});

});

// solution:
// var shifted = array.shift()

describe('Array.prototype.shift', function () {

	it('has length 3', function () {
		expect(array.length).to.equal(3);
	});

	it('the first item was removed', function () {
		expect(shifted).to.equal(1);
	});

});

// solution:
// var newArray = array.concat([5, 6, 7])

describe('Array.prototype.concat', function () {

	it('the arrays concatenated', function () {
		expect(newArray).to.equal([1,2,3,4,5,6,7]);
	});

});

// solution:

describe('Array.prototype.filter', function () {

	it('', function () {
		expect().to.equal();
	});

	it('', function () {
		expect().to.equal();
	});

});

// solution:

describe('Array.prototype.forEach', function () {

	it('', function () {
		expect().to.equal();
	});

	it('', function () {
		expect().to.equal();
	});

});

