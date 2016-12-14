angular.module('finalProject')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', '$state', 'Waypoint'];
//SET MAP
function googleMap($window, $state, Waypoint) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      zoom: '=',
      waypoints: '=',
      hasInfoWindows: '=',
      isEditable: '=',
      isTraceable: '='
    },
    link: function ($scope, element) {
      console.log($scope);
      const map = new $window.google.maps.Map(element[0] , {
        center: $scope.center,
        zoom: $scope.zoom,
        mapTypeId: 'terrain'
      });

      const markerRoutePathWaypoints = [];

      //POLYLINES
      if($scope.isTraceable) {
        $scope.waypoints.forEach((waypoint) => {
          markerRoutePathWaypoints.push({ lat: waypoint.lat, lng: waypoint.lng });
        });
        const routePath = new $window.google.maps.Polyline({
          path: markerRoutePathWaypoints,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        routePath.setMap(map);
      }
      //CLEAR MARKERS
      let markers = [];
      function clearMarkers() {
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        markers =[];
      }

      //EDIT LAT LNG FOR ROUTE EDIT
      function handleEvent(event) {
        this.waypoint.lat = event.latLng.lat();
        this.waypoint.lng = event.latLng.lng();
        Waypoint.update(this.waypoint, () => {
          console.log('saved!');
        });
      }

//SET MARKERS
      $scope.$watch('waypoints', () => {
        clearMarkers();
        if($scope.waypoints) {
          $scope.waypoints.forEach((waypoint) => {
            const marker = new $window.google.maps.Marker({
              position: { lat: waypoint.lat, lng: waypoint.lng },
              map: map,
              animation: $window.google.maps.Animation.DROP,
              draggable: $scope.isEditable,
              waypoint: waypoint
            });

            //EVENT LISTENER FOR EDIT
            marker.addListener('dragend', handleEvent);

            // ROUTE INDEX INFO WINDOW
            if($scope.hasInfoWindows) {
              marker.addListener('mouseover', () => {
                infoWindow.open(map, marker);
                markers.push(marker);
              });
              marker.addListener('mouseout', () => {
                infoWindow.close();
              });
              marker.addListener('click', () => {
                window.location.href = `http://localhost:8000/#/routes/${waypoint.route.id}`;
              });

              // POPULATE INFO WINDOW
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
