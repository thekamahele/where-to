angular.module('whereTo.auth', ['firebase'])
  .controller('AuthController', ['$scope', '$state', '$stateParams', 'Profile', function($scope, $state, $stateParams, Profile){
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

    fbRef.onAuth(function(authData){
     if(authData) {
        $state.go('map')
      } else {
        console.log('User unauthenticated')
      }
    }) 

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

      var userRef = new Firebase("https://where-to-next.firebaseio.com/users")

      checkAuth.createUser(email, password, function(error, user) {
        if (error === null) {
          console.log("User created successfully:", user);
           $scope.login();

           userRef.child(user.uid).set({
                provider: user.provider,
                name: user.email
              });


        } else {
          console.log("Error creating user:", error);
        }
      });
  
    }

    $scope.logout = function() {
      checkAuth.logout();
      $state.go('login')
    }

  }])