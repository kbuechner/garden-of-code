'use strict';
const router = require('express').Router();
const child_process = require('child_process');
const util = require('util');
const TIMEOUT_SECS = 5;
const SUPPORTED_LANGUAGES = ['node']


function postExecHandler(res, err, stdout) {
	if (err) {
		console.log('postExecHandler', util.inspect(err, {depth: null}));
		var errTrace = {code: '', trace: [{'event': 'uncaught_exception'}]};
		errTrace.trace[0].exception_msg = err.killed ? 'Timeout error. Your code ran for more than ' + TIMEOUT_SECS + ' seconds. Please shorten and try again.' : 'Unknown error. We apologize for the inconvenience.';
		res.send(JSON.stringify(errTrace));
	}
	else {
		res.send(stdout);
	}
}

function runDocker(req, res) {
	
	let path = req.params.path;
	if (!SUPPORTED_LANGUAGES.includes(path)) res.send(404);

	let code = req.body.code;
	let testId = req.params.id;
	let exeFile = 'docker';
	let imgName = "meredithroman/thisisfine:" + path
	// this will only work for the Node container
	// I will need to be more clever after I add Python
	let args = ['run', '--rm', '--user=netuser', '--net=none', '--cap-drop', 'all', imgName, 
				'node', 'main.js', '--testId=' + testId, '--code=' + code];
	child_process.execFile(exeFile, args,
		{timeout: TIMEOUT_SECS * 1000,
		maxBuffer: 5000 * 1024,
		killSignal: 'SIGINT'},
		postExecHandler.bind(null, res));

}

router.post('/:path/:id', runDocker);

module.exports = router;
