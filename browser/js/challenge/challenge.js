app.config(function ($stateProvider) {
	$stateProvider.state('challenge', {
		url: '/challenges/:id',
		templateUrl: 'js/challenge/challenge.html',
		controller: 'ChallengeCtrl'
    });
});

app.controller('ChallengeCtrl', function ($scope, $stateParams, ChallengeFactory){

	let id = $stateParams.id;

	ChallengeFactory.getChallenge(id)
	.then(function (challenge) {
		$scope.challenge = challenge;
		$scope.runTests = function(code) {
			ChallengeFactory.runTests(challenge.language, challenge.id, code);
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
			console.log(resp.data);
			challengeCode.results = resp.data;
		});
	}

	return factory;
});
