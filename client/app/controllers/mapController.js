angular.module('whereTo.map', [])

.controller('MapController', function($scope, $state, MapService, AuthService) {
    var fbRef = new Firebase("URL HERE");

    var authData = fbRef.getAuth();
    var map = MapService.initMap();

    //function to fetch user's locations from database
    $scope.fetchMarkers = function() {
      fbRef.child('users').child(authData.uid).once('value', function(snapshot) {
          var places = snapshot.val().whereToList;
          console.log(places)

          //iterate over user's location and call pinMap on each location
          for (var key in places) {
              console.log(places[key])
              $scope.pinMap(places[key]);
          }

      }, function(errorObject) {
          console.log("The read failed: " + errorObject.code);
      });
    }

    $scope.pinMap = function(location) {
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
          address: location
      }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {

              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: './assets/airplane.png'
              });
          }
      });
    }

    //check if user is authorized, if not redirect to login
    if (authData === null) {
        $state.go('login')
    } else {
        $scope.fetchMarkers();
    }

    $scope.location;

    $scope.findLoc = function() {
      $scope.location = $scope.map.location
          //send to geocoder in mapservice
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
          address: $scope.location
      }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {

              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: './assets/airplane.png'
              });
              //function to insert coordinates into database
              fbRef.child('users').child(authData.uid).child('whereToList').push($scope.location)

          } else {
              alert("Geocode was not successful for the following reason: " + status);
          }
      });

      $scope.map.location = ''
    }

});