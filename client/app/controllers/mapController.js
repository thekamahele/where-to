angular.module('whereTo.map', [])

  .controller('MapController', function($scope, MapService){
    $scope.location

    var map = new google.maps.Map(document.getElementById('mapdisplay'), {
        zoom: 3,
        center: new google.maps.LatLng(0,0)
    });

    $scope.findLoc = function() {
      $scope.location = $scope.map.location
      //send to geocoder in mapservice
      var geocoder = new google.maps.Geocoder;

      geocoder.geocode({address: $scope.location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log('success', results)
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
        }
      })
    }
 


  });
