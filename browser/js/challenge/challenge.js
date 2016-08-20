app.config(function ($stateProvider) {
	$stateProvider.state('challenge', {
		url: '/challenges/:id',
		templateUrl: 'js/challenge/challenge.html',
		controller: 'ChallengeCtrl'
    });
});

app.controller('ChallengeCtrl', function ($scope, $stateParams, ChallengeFactory, $timeout){

	let id = $stateParams.id;

	ChallengeFactory.getChallenge(id)
	.then(function (challenge) {
		$scope.challenge = challenge;
		$scope.runTests = function(code) {
			ChallengeFactory.runTests(challenge.language, challenge.id, code)
			.then(function(result){
				$scope.results = result;
			});
		};
		$scope.saveCode = function(code) {
			ChallengeFactory.saveCode(challenge.id, code)
			// .then(function(result){
				$scope.saved = true;
				$timeout(function () {$scope.saved = false}, 6000)
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
	factory.saveCode = function(challengeId,code) {
		console.log("we'll save the code some other time!")
		return 1
	}
	return factory;
});
