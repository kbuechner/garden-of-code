const child_process = require('child_process');

let argv = require('minimist')(process.argv.slice(2));
let code = argv.code;
let testName = argv.testName;
let command = 'code=' + '"' + code + '"' + ' ./node_modules/mocha/bin/mocha --grep "' + testName + '"' + ' --reporter json'

child_process.exec(command, function (err, sdout, sderr) {
	console.log(sdout);
});
