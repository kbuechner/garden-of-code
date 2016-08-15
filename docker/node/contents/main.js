const child_process = require('child_process');
const TESTS = {
	1: 'Hello World'
}

let argv = require('minimist')(process.argv.slice(2));
let code = argv.code;
let testId = argv.testId;
let command = 'code=' + '"' + code + '"' + ' ./node_modules/mocha/bin/mocha --grep "' + TESTS[testId] +'"'

child_process.exec(command, function (err, sdout, sderr) {
	if (err) console.log(err);
	if (sderr) console.log(sderr);
	else console.log(sdout);
});
