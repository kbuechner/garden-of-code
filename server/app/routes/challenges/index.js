'use strict';
const router = require('express').Router();
const child_process = require('child_process');
const util = require('util');
const TIMEOUT_SECS = 5;



function runDocker(req, res) {
	// get the path variable from the URL
	// check path variable against a list of supported languages
	// if supported, run the tests for the uploaded code in docker
	let exeFile = 'docker';
	//var args = ['run', '--rm', '--user=netuser', '--net=none', '--cap-drop', 'all', /*Docker image name here*/,
	//			'node', /*File to be run in docker here*/, /*code passed in here*/
	//			];

}

function dockerHelloWorld(req, res) {
	let exeFile = 'docker';
	let args = ['run', '--rm', '--user=netuser', '--net=none', '--cap-drop', 'all', 
				'meredithroman/thisisfine:node', 'node', 'main.js']
	child_process.execFile(exeFile, args,
		{timeout: TIMEOUT_SECS * 1000,
		maxBuffer: 5000 * 1024,
		killSignal: 'SIGINT'},
		postExecHandler.bind(null, res));
}

function postExecHandler(res, err, stdout, stderr) {
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

router.post('/:path', runDocker);
router.get('/', dockerHelloWorld);


module.exports = router;
