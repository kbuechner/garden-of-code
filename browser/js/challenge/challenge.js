app.config(function ($stateProvider) {
	$stateProvider.state('challenge', {
		url: '/challenges/:id',
		templateUrl: 'js/challenge/challenge.html',
		controller: 'ChallengeCtrl'
    });
});

app.controller('ChallengeCtrl', function ($state, $scope, $stateParams, ChallengeFactory, $timeout, AuthService, $sce){

	let challengeId = $stateParams.id;

	// this sends me to the correct URL but doesn't update the page
	// I will fix it on Monday
	$scope.nextChallenge = function () {
		$state.go('challenge', {id: ++$stateParams.id});
	}

	ChallengeFactory.getChallenge(challengeId)
	.then(function (challenge) {
		$scope.challenge = challenge;
		$scope.runTests = function(code) {
			ChallengeFactory.runTests(challenge.language, challenge.id, code)
			.then(function(result){
				let outputHTML = result.output.replace(/\n/g, "<br />");
				result.output = $sce.trustAsHtml(outputHTML);
				$scope.results = result;
				if (result.passed) $scope.saveCode($scope.userCode, result.passed);
			});
		};
		return AuthService.getLoggedInUser()
	})
	.then(function (user) {
		$scope.user = user;
		$scope.saveCode = function(code, completed) {
			ChallengeFactory.saveCode($scope.challenge.id, user.id, code, completed)
			.then(function (result){
				if (result.status === 200) $scope.saved = true;
				$scope.complete = result.data.complete
				$timeout(function () {$scope.saved = false}, 6000)
			});
		}
	})
	.then(function () {
		ChallengeFactory.getCode($scope.user.id, $scope.challenge.id)
		.then(function (code) {
			let loadText = code ? code : '';

			let editor = ace.edit("editor");
			ace.config.loadModule('ace/ext/language_tools', function() {
				editor.setTheme("ace/theme/clouds");
				editor.getSession().setMode("ace/mode/javascript");
				editor.setValue(loadText);
			});

		})
	});
});

app.factory('ChallengeFactory', function ($http) {

	let factory = {};

	factory.getChallenge = function (id) {
		return $http.get('/api/challenges/' + id)
		.then(function (resp) {
			return resp.data;
		});
	}

	factory.runTests = function (languageName, challengeId, challengeCode) {
		return $http.post('/api/challenges/' + languageName + '/' + challengeId, {code: challengeCode})
		.then(function (resp) {
			return resp.data;
		});
	}

	factory.saveCode = function(challengeId, userId, code, completed) {
		let complete = completed ? true : false;
		return $http.post('/api/userchallenges/' + userId + 
			'/challenges/' + challengeId, {userCode: code, complete: complete})
	}

	factory.getCode = function (userId, challengeId) {
		return $http.get('/api/userchallenges/' + userId + '/challenges/' + challengeId)
		.then(function (resp) {
			let code = resp.data.userCode;
			return code;
		})
	}

	return factory;
});
