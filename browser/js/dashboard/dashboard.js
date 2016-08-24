app.config(function ($stateProvider) {
	$stateProvider.state('dashboard', {
    url: '/dashboard',
		templateUrl: 'js/dashboard/dashboard.html',
		controller: 'DashboardCtrl',
    resolve: {
    user: function (AuthService) {
        return AuthService.getLoggedInUser()
      },
      allChallenges: function (user, DashboardFactory) {
        return DashboardFactory.getLatest(user.id);
      }
    }
  });
});

app.controller('DashboardCtrl', function ($scope, allChallenges) {

  $scope.allChallenges = allChallenges;

  // if allChallenges = []
  // run getNewPath to build out dashHero
  if ($scope.allChallenges.length === 0){
    $scope.dashHero = getNewPath();
  }

  var sortedChallenges = $scope.allChallenges.slice();

  // complete needs to be false
  for (var i = sortedChallenges.length - 1; i >= 0; i--) {
    if (sortedChallenges[i].complete === false) {
      $scope.dashHero = sortedChallenges[i];
      $scope.dashHero.headline = "Resume Learning!";
      $scope.dashHero.subheadIntro = "Continue working on ";
      /*console.log($scope.dashHero);*/
      return;
    }
  }


  function getNewPath () {
    // look for another path that the user hasn't started
    $scope.dashHero = {
      challenge: {
        title: "Welcome to JavaScript!",
        path: {
          name: "JavaScript Basics"
        }
      },
      challengeId: 1
    };
    $scope.dashHero.headline = "Start Learning!";
    $scope.dashHero.subheadIntro = "Begin working on ";

    return $scope.dashHero;
  }


  //$scope.dashHero = sortedChallenges[sortedChallenges.length-1];
});