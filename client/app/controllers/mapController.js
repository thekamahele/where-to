angular.module('whereTo.map', [])

  .controller('MapController', function($scope, $state, $stateParams, MapService){
    var fbRef = new Firebase("https://where-to-next.firebaseio.com");
    var authData = fbRef.getAuth();
    if (authData === null) {
      $state.go('login')
    }
    $scope.location

    var styles = [{
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
            "hue": "#008285"
        }, {
            "saturation": 100
        }, {
            "lightness": -66
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
            "hue": "#CAFCE4"
        }, {
            "saturation": 85
        }, {
            "lightness": 0
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [{
            "hue": "#61C273"
        }, {
            "saturation": 2
        }, {
            "lightness": -27
        }, {
            "visibility": "on"
        }]
    }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
            "hue": "#B0C4C7"
        }, {
            "saturation": -83
        }, {
            "lightness": 26
        }, {
            "visibility": "on"
        }]
    }]

    var map = new google.maps.Map(document.getElementById('mapdisplay'), {
        zoom: 2,
        center: new google.maps.LatLng(0,0)
    });

    map.setOptions({styles: styles});


    $scope.findLoc = function() {
      $scope.location = $scope.map.location
      //send to geocoder in mapservice
      var geocoder = new google.maps.Geocoder;

      geocoder.geocode({address: $scope.location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
  
        //map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        //function to insert coordinates into database

      } else {
        alert("Geocode was not successful for the following reason: " + status);
        }
      })
    }
 


  });
