app.config(function ($stateProvider) {
	$stateProvider.state('challenge', {
		url: '/challenges/:id',
		templateUrl: 'js/challenge/challenge.html',
		controller: 'ChallengeCtrl'
    });
});

app.controller('ChallengeCtrl', function ($scope, $stateParams, ChallengeFactory, $timeout, AuthService){

	let challengeId = $stateParams.id;

	let editor = ace.edit("editor");
	ace.config.loadModule('ace/ext/language_tools', function() {
		editor.setTheme("ace/theme/clouds");
		editor.getSession().setMode("ace/mode/javascript");
		editor.setValue("the new text here");
	});

	AuthService.getLoggedInUser()
	.then(function (user) {
		$scope.user = user;
	})

	ChallengeFactory.getChallenge(challengeId)
	.then(function (challenge) {
		$scope.challenge = challenge;
		$scope.runTests = function(code) {
			ChallengeFactory.runTests(challenge.language, challenge.id, code)
			.then(function(result){
				$scope.results = result;
			});
		};
		return AuthService.getLoggedInUser()
	})
	.then(function (user) {
		$scope.user = user;
		$scope.saveCode = function(code) {
			ChallengeFactory.saveCode($scope.challenge.id, user.id, code)
			.then(function(result) {
				console.log(result);
			})
			// .then(function(result){
				/*$scope.saved = true;
				$timeout(function () {$scope.saved = false}, 6000)*/
			// });
		}
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
			// console.log(resp.data);
			return resp.data;
		});
	}
	factory.saveCode = function(challengeId, userId, code) {
		return $http.post('/api/userchallenges/' + userId + 
			'/challenges/' + challengeId, {userCode: code})
	}
	return factory;
});
