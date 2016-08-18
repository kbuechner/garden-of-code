app.factory('SignupFactory',function($http, AuthService){
    return {
        createUser: function(loginInfo){
            return $http.post('/api/users', loginInfo)
            .then(function (user) {
            if(user) {
                AuthService.login(loginInfo)}
            else {
                throw new Error('Unable to create account.')}
            })
        },
        checkUsername: function (enteredName) {
            return $http.get('/api/users/username/'+ enteredName)
            .then(function(isDupe){
                if (isDupe) {return 'That username is already taken. '
                   + 'Please choose a different name.'}
                else return false;
            })
            .catch(function (err) {
                console.log('Dupe check: '+err.data)
            })
        },
        signupFacebook: function (userName) {
            return $http.get('/auth/facebook')
            .catch(function(err) {console.log(err)} );
        }

    }
})
