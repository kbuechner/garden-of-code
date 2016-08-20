app.config(function ($stateProvider) {
	$stateProvider.state('challenge', {
		url: '/challenges/:id',
		templateUrl: 'js/challenge/challenge.html',
		controller: 'ChallengeCtrl'
    });
});

app.controller('ChallengeCtrl', function ($scope, $stateParams, ChallengeFactory, $timeout, AuthService, $sce){

	let challengeId = $stateParams.id;

	ChallengeFactory.getChallenge(challengeId)
	.then(function (challenge) {
		$scope.challenge = challenge;
		$scope.runTests = function(code) {
			ChallengeFactory.runTests(challenge.language, challenge.id, code)
			.then(function(result){
				let results = result.output.replace(/\n/g, "<br />");
				$scope.results = $sce.trustAsHtml(results)
				console.log($scope.results)
			});
		};
		return AuthService.getLoggedInUser()
	})
	.then(function (user) {
		$scope.user = user;
		$scope.saveCode = function(code) {
			ChallengeFactory.saveCode($scope.challenge.id, user.id, code)
			.then(function (result){
				if (result.status === 200) {
					$scope.saved = true;
				}
				$timeout(function () {$scope.saved = false}, 6000)
			});
		}
	})
	.then(function () {
		ChallengeFactory.getCode($scope.user.id, $scope.challenge.id)
		.then(function (code) {
			let loadText = code ? code : 'wedlhgfdlglkgflkdfkjglfdk';

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

	factory.saveCode = function(challengeId, userId, code) {
		return $http.post('/api/userchallenges/' + userId +
			'/challenges/' + challengeId, {userCode: code})
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
