app.config(function ($stateProvider) {
	$stateProvider.state('paths', {
		url: '/paths',
		templateUrl: 'js/paths/paths.html',
		controller: 'PathsCtrl'
    });
});

app.config(function ($stateProvider) {
	$stateProvider.state('path', {
		url: '/paths/:id',
		templateUrl: 'js/paths/path.html'
    });
});

app.controller('PathsCtrl', function($scope){
	$scope.tiles = [
		{title: 'Arrays'},
		{title: 'Strings'},
		{title: 'Data Types'}
	];
});