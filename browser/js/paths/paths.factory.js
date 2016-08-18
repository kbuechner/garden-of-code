app.factory('PathsFactory', function ($http) {

    return {
    	fetchAll: function() {
    		return $http.get('/api/paths')
    		.then(function(res) {
    			return res.data;
    		})
    	}
    }

});
