const child_process = require('child_process');

let argv = require('minimist')(process.argv.slice(2));
let code = argv.code;
let testName = argv.testName;
let command = 'code=' + '"' + code + '"' + ' ./node_modules/mocha/bin/mocha --grep "' + testName +'"'

child_process.exec(command, function (err, sdout, sderr) {
	let passed = err ? false : true;
	sdout = sdout.trim().replace(/\n/g, "\\n");
	console.log('{"passed": ' + passed + ', "output": "' + sdout + '"}');
});
