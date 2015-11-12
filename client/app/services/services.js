angular.module('where-to.services', [])
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
