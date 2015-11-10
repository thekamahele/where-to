angular.module('whereTo.map', [])

  .controller('MapController', function($scope, $state, $stateParams){
    var fbRef = new Firebase("https://where-to-next.firebaseio.com");

    var userRef = new Firebase("https://where-to-next.firebaseio.com/users");

    //check if user is authorized, if not redirect to login
    var authData = fbRef.getAuth();

    $scope.fetchMarkers = function() {

      userRef.child(authData.uid).on("value", function(snapshot) {
        var places = snapshot.val().whereToList;
        console.log(places)

        for(var key in places) {
          console.log(places[key])
          $scope.pinMap(places[key]);
        }

      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    }


//******************************************************//
        //**************** MAP ******************//   
//******************************************************// 

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
//******************************************************//
//******************************************************//   
//******************************************************//    
    $scope.pinMap = function(location) {
      var geocoder = new google.maps.Geocoder();

      geocoder.geocode({address: location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
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

      geocoder.geocode({address: $scope.location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
        //function to insert coordinates into database
        userRef.child(authData.uid).child('whereToList').push($scope.location)

        // userRef.child(authData.uid).on('value', function(dataSnapshot) {
        //    console.log('hey there')
        //   $scope.fetchMarkers();
        // });

      } else {
        alert("Geocode was not successful for the following reason: " + status);
        }
      })
      $scope.map.location = ''
    }

  });
