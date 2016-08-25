app.config(function ($stateProvider) {
	$stateProvider.state('challenge', {
		url: '/challenges/:id',
		templateUrl: 'js/challenge/challenge.html',
		controller: 'ChallengeCtrl',
		resolve: {
			challenge: function(ChallengeFactory, $stateParams) {
				return ChallengeFactory.getChallenge($stateParams.id);
			},
			user: function (AuthService) {
				return AuthService.getLoggedInUser()
			},
			code: function (ChallengeFactory, challenge, user) {
				return ChallengeFactory.getCode(user.id, challenge.id);
			}
		}
    });
});

app.controller('ChallengeCtrl', function ($state, $scope, $stateParams, challenge, user, code, ChallengeFactory, $timeout, $sce){

	$scope.userCode = code||challenge.startCode||'';
	$scope.challenge = challenge;
	$scope.challenge.description = $sce.trustAsHtml($scope.challenge.description);
	$scope.challenge.examples = $sce.trustAsHtml($scope.challenge.examples);
	$scope.user = user;
	$scope.showHint = false;
	$scope.challenge.pathId = challenge.pathId

	$scope.runTests = function (usrCode) {
		ChallengeFactory.runTests(challenge, usrCode)
		.then(function(result){
			if (!result.failures.length) {
				let successMsg = "Congratualtions, you completed the challenge!"
				$scope.output = $sce.trustAsHtml(successMsg);
				$scope.saveCode($scope.userCode, true)
			}
			else {
				let failMsg = "Tests failed: " + result.failures.length;
				for (let failure of result.failures) {
					failMsg += "<br/><br/>Title: " + failure.title + "<br/> Error: " + failure.err.stack;
				}
				$scope.output = $sce.trustAsHtml(failMsg);
			}
		});
	};

	$scope.nextChallenge = function () {
		$state.go('challenge', {id: Number($stateParams.id) + 1});
	}

	$scope.saveCode = function(code, completed) {
		ChallengeFactory.saveCode(challenge.id, user.id, code, completed)
		.then(function (result){
			if (result.status === 200) $scope.saved = true;
			$scope.complete = result.data.complete
			$timeout(function () {$scope.saved = false}, 6000)
		});
	}

	$scope.toggleHint = function() {
		$scope.showHint = !$scope.showHint;
	}

});

app.factory('ChallengeFactory', function ($http) {

	let factory = {};

	factory.getChallenge = function (id) {
		return $http.get('/api/challenges/' + id)
		.then(function (resp) {
			return resp.data;
		});
	}

	factory.runTests = function (challenge, challengeCode) {
		return $http.post('/api/challenges/' + challenge.language, {code: challengeCode, test: challenge.title})
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
