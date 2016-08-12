const expect = require('chai').expect;
let _ = require('./main');
let ugh = eval(_);

/*let _ = process.argv[2];

let helloWorld = eval(_);*/

describe('Hello World', function() {
	/*expect(helloWorldFunc).to.be.a('function');
	expect(helloWorldFunc()).to.equal('Hello World!');*/
	it('says hello', function () {
		expect(ugh).to.equal('Hello World');
	});
});
