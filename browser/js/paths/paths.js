app.config(function ($stateProvider) {
	$stateProvider.state('paths', {
		url: '/paths',
		templateUrl: 'js/paths/paths.html',
		controller: 'PathsCtrl',
		resolve: {
			allPaths: function(PathsFactory) {
				return PathsFactory.fetchAll();
			}
		}
    });
});

app.controller('PathsCtrl', function($scope, allPaths){
	$scope.tiles = allPaths;
});

app.config(function ($stateProvider) {
	$stateProvider.state('path', {
		url: '/paths/:id',
		templateUrl: 'js/paths/path.html',
		controller: 'PathCtrl',
		resolve: {
			allChallenges: function(PathsFactory, $stateParams) {
				return PathsFactory.getChallenges($stateParams.id);
			}
		}
	});
});

app.controller('PathCtrl', function($scope, allChallenges){
	$scope.pathName = allChallenges.name;
	$scope.challenges = allChallenges.challenges;
});