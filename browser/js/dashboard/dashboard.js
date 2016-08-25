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

app.controller('DashboardCtrl', function ($scope, allChallenges, PathsFactory) {

  $scope.allChallenges = allChallenges;

  if ($scope.allChallenges.length === 0){
    $scope.dashHero = getNewPath();
  }

  var sortedChallenges = $scope.allChallenges.slice();

  for (var i = sortedChallenges.length - 1; i >= 0; i--) {
    if (sortedChallenges[i].complete === false) {
      $scope.dashHero = sortedChallenges[i];
      $scope.dashHero.headline = "Resume Learning!";
      $scope.dashHero.subheadIntro = "Continue working on ";
      return;
    }
    if (i === 0 && $scope.dashHero === undefined){
      var pathNum = sortedChallenges[sortedChallenges.length-1].challenge.pathId;

      var nextChallenge = sortedChallenges[sortedChallenges.length-1].challengeId + 1;

      console.log('nextChallenge', nextChallenge);

      PathsFactory.getChallenges(pathNum)
      .then(function (path) {
        for (var i = 0; i < path.challenges.length; i++) {
          if (path.challenges[i].id === nextChallenge) {
            $scope.dashHero = {
              challenge: {
                title: path.challenges[i].title,
                path: {
                  name: path.name
                }
              },
              challengeId: path.challenges[i].id,
              pathId: path.id
            };
            $scope.dashHero.headline = "Resume Learning!";
            $scope.dashHero.subheadIntro = "Begin working on ";
          }
        }
      })
    }
  }

  function getNewPath () {
    $scope.dashHero = {
      challenge: {
        title: "Welcome to JavaScript!",
        path: {
          name: "JavaScript Basics",
          id: 1
        }
      },
      challengeId: 1
    };
    $scope.dashHero.headline = "Start Learning!";
    $scope.dashHero.subheadIntro = "Begin working on ";

    return $scope.dashHero;
  }
});
