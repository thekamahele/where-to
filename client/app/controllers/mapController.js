angular.module('whereTo.map', [])

  .controller('MapController', function($scope, MapService){
    $scope.location

    // $scope.findLoc = function() {
    //   $scope.location = $scope.map.location
    //   //send to geocoder in mapservice
    // }

    //MapService.init();
    var map = new google.maps.Map(document.getElementById('mapdisplay'), {
            zoom: 3,
            center: new google.maps.LatLng(0,0)
        });
  });
