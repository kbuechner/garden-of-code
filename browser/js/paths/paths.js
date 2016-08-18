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

app.config(function ($stateProvider) {
	$stateProvider.state('path', {
		url: '/paths/:id',
		templateUrl: 'js/paths/path.html'
	});
});

app.controller('PathsCtrl', function($scope, allPaths){
	$scope.tiles = allPaths;
});