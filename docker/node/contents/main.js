const child_process = require('child_process');

let argv = require('minimist')(process.argv.slice(2));
let code = argv.code;

child_process.exec('code=' + '"' + code + '"' + ' ./node_modules/mocha/bin/mocha --grep "Hello World"', function (err, sdout) {
	if (err) console.log(err);
	else console.log(sdout);
});
