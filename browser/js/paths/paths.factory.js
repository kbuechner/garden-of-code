app.factory('PathsFactory', function ($http) {
	function getData(res) { return res.data};

		return {
			fetchAll: function() {
				return $http.get('/api/paths')
				.then(getData);
			},
		getChallenges: function(id) {
			var url = '/api/paths/' + id + '/challenges';

			return $http.get(url)
			.then(function(res){
				return res.data[0];
			});
		}
	}

});
