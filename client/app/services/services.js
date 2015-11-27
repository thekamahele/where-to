angular.module('where-to.services', ['firebase'])
.factory('MapService', function($http){
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

var initMap = function() {
  var map = new google.maps.Map(document.getElementById('mapdisplay'), {
      zoom: 2,
      center: new google.maps.LatLng(0, 0)
  });

  map.setOptions({
      styles: styles
  });

  return map;
}

  return {
    initMap: initMap
  }

})
.factory('AuthService', function($state) {
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
  
 fbRef.onAuth(function(authData) {
      if (authData) {
          $state.go('map')
      } else {
          console.log('User unauthenticated')
      }
  });

  var login = function(email, password) {
    checkAuth.login('password', {
        email: email,
        password: password
    });
  };

  var logout = function() {
    checkAuth.logout();
  };

  var signup = function(email, password) {
    checkAuth.createUser(email, password, function(error, user) {
        if (error === null) {
            console.log("User created successfully:", user);
            login(email, password);
            //saving user info
            fbRef.child(user.uid).set({
                provider: user.provider,
                name: user.email,
                whereToList: []
            });

        } else {
            console.log("Error creating user:", error);
        }
    });
  }

  return {
    login: login,
    signup: signup,
    logout: logout
  }

})
// .factory('DataService', function($http) {
//   var getLocations = function () {
//     return $http({
//       method: 'GET',
//       url: '/api/users'
//     })
//     .then(function (resp) {
//       return resp.data;
//     });
//   };

//   var addLocations = function (coordinates) {
//     return $http({
//       method: 'POST',
//       url: '/api/users',
//       data: coordinates
//     })
//     .then(function (resp) {
//       return resp.data;
//     });
//   };

//   return {
//     getLocations: getLocations,
//     addLocations: addLocations
//   };    
// })
