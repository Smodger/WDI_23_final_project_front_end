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
      isTraceable: '=',
      routeId: '='
    },
    link: function ($scope, element) {
      console.log($scope);
      const map = new $window.google.maps.Map(element[0] , {
        center: $scope.center,
        zoom: $scope.zoom,
        mapTypeId: 'terrain'
      });


      // function isAuthorised() {
      //   if(main.currentUser === Route.user.id) {
      //
      //   }
      // }

      // Addingwaypoints and updating their position so it orders the waypoints.
      const createdWaypoints = [];
      function addWaypoint(event) {
        console.log('clicked');
        const waypoint = {};
        waypoint.lat = event.latLng.lat();
        waypoint.lng = event.latLng.lng();
        // If we are on exising route edit
        if($state.params.id) {
          waypoint.route_id = $state.params.id;
          waypoint.position = $scope.waypoints.length + 1;
        // If we are creating brand new route
        } else {
          waypoint.route_id = $scope.routeId;
          createdWaypoints.push(waypoint);
          waypoint.position = createdWaypoints.length;
        }
        Waypoint.save(waypoint, (waypoint) => {
          if($state.params.id) {
            $scope.waypoints.push(waypoint);
          }
          createMarker(waypoint);
          drawPolyLines();
        });
      }

      //ADD WAYPOINTS FOR EDIT (& CREATE)
      map.addListener('dblclick', addWaypoint);

      let markerRoutePathWaypoints = [];
      const routePath = new $window.google.maps.Polyline({
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: map
      });


      //POLYLINES
      function drawPolyLines() {
        if($scope.isTraceable) {
          markerRoutePathWaypoints = [];
          const waypointsToPlot = $scope.waypoints ? $scope.waypoints : createdWaypoints;
          waypointsToPlot.forEach((waypoint) => {
            markerRoutePathWaypoints.push({ lat: waypoint.lat, lng: waypoint.lng });
          });
          routePath.setPath(markerRoutePathWaypoints);
        }
      }

      drawPolyLines();
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
          // $scope.$apply();
          drawPolyLines();
        });
      }

      function createMarker(waypoint) {
        const marker = new $window.google.maps.Marker({
          position: { lat: waypoint.lat, lng: waypoint.lng },
          map: map,
          animation: $window.google.maps.Animation.DROP,
          draggable: $scope.isEditable,
          waypoint: waypoint
        });


        //EVENT LISTENER FOR EDIT
        marker.addListener('dragend', handleEvent);

        // Disable zoom in on double click
        map.setOptions({disableDoubleClickZoom: true });

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
            window.location.href = `/#/routes/${waypoint.route.id}`;
          });

          // POPULATE INFO WINDOW
          const contentString = '<h1>' + waypoint.route.title +'</h1>' + '<p>' + waypoint.route.route_description + '</p><h5>Click the marker for route details</h5><style> h1 { border: 1px solid #E37222; color: #E37222; text-align: center; border-radius: 5px;} p {color: #777879} h5 {color: #777879; text-decoration: underline;}</style>';
          const infoWindow = new $window.google.maps.InfoWindow({
            content: contentString
          });
        }

        markers.push(marker);
      }

//SET MARKERS
      $scope.$watch('waypoints', () => {
        clearMarkers();
        if($scope.waypoints) {
          $scope.waypoints.forEach(createMarker);
        }
      });
    }
  };
}
