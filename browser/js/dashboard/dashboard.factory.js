app.factory('DashboardFactory', function ($http) {
	return {
		getLatest: function () {
			return $http.get('/api/userchallenges/latest')
			.then(function (res) {
				return res.data;
			})
		}
	}
});