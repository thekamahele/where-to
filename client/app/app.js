angular.module('whereto', ['whereTo.map', 'where-to.services', 'ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.html',
      controller: 'AuthController'
    })
    // .state('signup', {
    //   url: '/signup',
    //   templateUrl: 'app/views/signup.html',
    //   controller: 'AuthController'
    // })
    .state('map', {
      url: '/map',
      templateUrl: 'app/views/map.html',
      controller: 'MapController'
    });

    $urlRouterProvider.otherwise('/map');

}])
