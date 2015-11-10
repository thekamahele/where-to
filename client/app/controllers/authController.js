angular.module('whereTo.auth', ['firebase'])
  .controller('AuthController', ['$scope', function($scope){
    var fbRef = new Firebase("https://where-to-next.firebaseio.com");

    var checkAuth = new FirebaseSimpleLogin(fbRef, function(err, user) {
      if (err !== null) {
          console.log("Error authenticating:", err);
        } else if (user !== null) {
          console.log("User is logged in:", user);
        } else {
          console.log("User is logged out");
        }
    });

    $scope.login = function() {
      var email = $scope.user.email;
      var password = $scope.user.password;

      checkAuth.login('password', {
        email: email,
        password: password
      })
    }

    $scope.signup = function() {

      var email = $scope.user.email;
      var password = $scope.user.password;

      checkAuth.createUser(email, password, function(error, user) {
        if (error === null) {
          console.log("User created successfully:", user);
        } else {
          console.log("Error creating user:", error);
        }
      });
    }

    $scope.logout = function() {
      checkAuth.logout();
    }

  }])