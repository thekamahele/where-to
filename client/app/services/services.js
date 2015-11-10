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
});
