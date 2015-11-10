angular.module('whereto', ['ui.router'])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'AuthController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/views/signup.html',
      controller: 'AuthController'
    })
    .state('map', {
      templateUrl: 'views/map.html',
      controller: 'MapController'
    });

    $urlRouterProvider.otherwise('/links');

}])
