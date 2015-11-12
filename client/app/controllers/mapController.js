angular.module('whereTo.map', [])

.controller('MapController', function($scope, $state, MapService) {
    var fbRef = new Firebase("https://where-to-next.firebaseio.com");

    //check if user is authorized, if not redirect to login
    var authData = fbRef.getAuth();

    var map = MapService.initMap();

    $scope.fetchMarkers = function() {
      fbRef.child('users').child(authData.uid).once('value', function(snapshot) {
          var places = snapshot.val().whereToList;
          console.log(places)

          for (var key in places) {
              console.log(places[key])
              $scope.pinMap(places[key]);
          }

          setTimeout(function() {
              for (var i = 0; i < leftOut.length; i++) {
                  $scope.pinMap(leftOut[i]);
              }
          }, 30000)

      }, function(errorObject) {
          console.log("The read failed: " + errorObject.code);
      });
    }   

    var leftOut = [];
    $scope.pinMap = function(location) {
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({
          address: location
      }, function(results, status) {
          console.log('here', location, status, google.maps.GeocoderStatus.OK)
          if (status == google.maps.GeocoderStatus.OK) {

              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                  icon: './assets/airplane.png'
              });
          } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
              leftOut.push(location);
              console.log(leftOut)
          }
      });
    }

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
      })
      $scope.map.location = ''
    }

});