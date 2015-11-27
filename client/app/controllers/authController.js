angular.module('whereTo.auth', ['firebase'])
  .controller('AuthController', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
     
      $scope.login = function() {
        var email = $scope.user.email;
        var password = $scope.user.password;

        AuthService.login(email, password)
      };

      $scope.signup = function() {
        var email = $scope.user.email;
        var password = $scope.user.password;

        AuthService.signup(email, password);
      };

      $scope.logout = function() {
          AuthService.logout();
          $state.go('login')
      }

  }])