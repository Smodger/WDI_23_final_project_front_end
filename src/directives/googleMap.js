angular.module('finalProject')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', '$state'];

function googleMap($window) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      zoom: '=',
      waypoints: '=',
      hasInfoWindows: '='
    },
    link: function ($scope, element) {
      const map = new $window.google.maps.Map(element[0] , {
        center: $scope.center,
        zoom: $scope.zoom,
        mapTypeId: 'terrain'
      });

      const routePath = new $window.google.maps.Polyline({
        path: markers,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      let markers = [];
      function clearMarkers() {
        markers.forEach((marker) => {
          routePath.setMap(map);
          marker.setMap(null);
        });
        markers =[];
      }

//ROUTES INDEX
      $scope.$watch('waypoints', ($state) => {
        clearMarkers();
        if($scope.waypoints) {
          $scope.waypoints.forEach((waypoint) => {
            const marker = new $window.google.maps.Marker({
              position: { lat: waypoint.lat, lng: waypoint.lng },
              map: map,
              animation: $window.google.maps.Animation.DROP
            });

            if($scope.hasInfoWindows) {
              marker.addListener('mouseover', () => {
                infoWindow.open(map, marker);
                markers.push(marker);
              });
              marker.addListener('mouseout', () => {
                infoWindow.close();
              });
              marker.addListener('click', () => {
                console.log(`/routes/${waypoint.route.id}`);
                // $state.go(`routes/${waypoint.route.id}`);
                window.location.href = `http://localhost:8000/#/routes/${waypoint.route.id}`;
              });

              const contentString = '<h1>' + waypoint.route.title +'</h1>' + '<p>' + waypoint.route.route_description + '</p>';
              const infoWindow = new $window.google.maps.InfoWindow({
                content: contentString
              });
            }
          });
        }
      });
    }
  };
}
