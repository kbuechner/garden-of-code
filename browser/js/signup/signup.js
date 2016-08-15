app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, $http, AuthService, $state) {
// AuthService, $state,
    $scope.login = {};
    $scope.error = null;

    $scope.submitNewUser = function (loginInfo) {
        $scope.error = null;
        if(!$scope.signupForm.$valid) {
            throw new Error('Validation error.')
        }
        $http.post('/api/users', loginInfo)
        .then(function (user) {
            if(user) {AuthService.login(loginInfo)}
            else {throw new Error('Unable to create account.')}
        }).then(function () {
            $state.go('home');
        }).catch(function (err) {
            console.log(err);
            if (err.status === 409) {
                $scope.error = 'Unable to create account. There is already an account with this email.';
            }
            else {$scope.error = 'Unable to complete login.'; }
        });
    };

});
