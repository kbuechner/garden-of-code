const child_process = require('child_process');
const TESTS = {
	2: 'Hello World',
	3: 'Intro to Variables',
	4: 'Let\'s Do Some Math!',
	5: 'Functions with Side Effects',
	6: 'Functions that Return Values',
	7: 'Assign the Results of a Function to a Variable',
	8: 'Booleans'
}

let argv = require('minimist')(process.argv.slice(2));
let code = argv.code;
let testId = argv.testId;
let command = 'code=' + '"' + code + '"' + ' ./node_modules/mocha/bin/mocha --grep "' + TESTS[testId] +'"'

child_process.exec(command, function (err, sdout, sderr) {
	let passed = err ? false : true;
	sdout = sdout.replace(/\n/g, "\\n");
	console.log('{"passed": ' + passed + ', "output": "' + sdout + '"}');
});
