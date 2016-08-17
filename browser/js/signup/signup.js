app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, $http, $state, SignupFactory) {

    $scope.login = {};
    $scope.error = null;

    $scope.checkUsername = function(username){
        $scope.dupeName = null;
        $scope.checkedName = null;
        console.log('userName matches pattern: '+ /^[a-zA-Z0-9\-\_]+$/.test(username))
        if(!$scope.usernameForm.$valid) {
            throw new Error('Validation error.')
        }
        SignupFactory.checkUsername(username)
        .then(function (result) {
            if(result) {$scope.dupeName = result}
            else { $scope.dupeName = null; $scope.checkedName = username; }
        })
        .catch(function (err) {$scope.dupeName=err; })
    }

    $scope.clearChecked = function() {
        $scope.checkedName = null;
    }
    $scope.signupFacebook = function () {
        SignupFactory.signupFacebook($scope.signup.userName)
        .then(function () {
            $state.go('home');
        }).catch($scope.errorHandler);

    }
    $scope.submitNewUser = function (loginInfo) {
        $scope.error = null;
        if(!$scope.signupForm.$valid) {
            throw new Error('Validation error.')
        }
        loginInfo.userName = $scope.signup.userName;
        return SignupFactory.createUser(loginInfo)
        .then(function () {
            $state.go('home');
        }).catch($scope.errorHandler);
    };

    $scope.errorHandler = function (err) {
        console.log(err);
        if (err.status === 409) {
            $scope.error = 'Unable to create account. There is already an account with this email.';
        }
        else {$scope.error = 'Unable to complete login.'; }
    }
});

