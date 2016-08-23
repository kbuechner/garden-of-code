app.factory('DashboardFactory', function ($http) {
	return {
		getLatest: function (id) {
			let url = '/api/userchallenges/' + id + '/challenges';
			return $http.get(url)
			.then(function (res) {
				return res.data;
			})
		}
	}
});