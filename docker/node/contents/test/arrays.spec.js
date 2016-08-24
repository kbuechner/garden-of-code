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
		expect(newArray[0]).to.equal(1);
		expect(newArray[1]).to.equal(2);
		expect(newArray[2]).to.equal(3);
		expect(newArray[3]).to.equal(4);
		expect(newArray[4]).to.equal(5);
		expect(newArray[5]).to.equal(6);
		expect(newArray[6]).to.equal(7);
	});

});

// solution:
// newArray = array.filter(function (item) { return item % 2 === 0 })

describe('Array.prototype.filter', function () {

	it('filters out odd numbers', function () {
		expect(newArray[0]).to.equal(2);
		expect(newArray[1]).to.equal(4);
	});

});

// solution:
// array.forEach(function (item, index) { array[index] = item + 1 })

describe('Array.prototype.forEach', function () {

	it('the numbers incremented', function () {
		expect(array[0]).to.equal(2);
		expect(array[1]).to.equal(3);
		expect(array[2]).to.equal(4);
		expect(array[3]).to.equal(5);
	});

});

