angular.module('where-to.services', [])
.factory('MapService', function($http){
  var googleMapService = {};

  // googleMapService.init = function () {
  //    var map = new google.maps.Map(document.getElementById('mapdisplay'), {
  //           zoom: 3,
  //           center: new google.maps.LatLng(0,0)
  //       });
  // }

  return googleMapService;
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
.factory("Profile", ["$firebaseObject",
  function($firebaseObject) {
    return function(username) {
      // create a reference to the database node where we will store our data
  
      var ref = new Firebase("https://where-to-next.firebaseio.com");
      var profileRef = ref.child(username);

      // return it as a synchronized object
      return $firebaseObject(profileRef);
    }
  }
]);