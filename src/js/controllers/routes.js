angular.module('finalProject')
  .controller('RoutesIndexController', RoutesIndexController)
  .controller('RoutesShowController', RoutesShowController)
  .controller('RoutesEditController', RoutesEditController);


RoutesIndexController.$inject = ['Route'];
function RoutesIndexController(Route) {
  const routesIndex = this;
  Route.query((routes) => {
    routesIndex.all = routes;

    routesIndex.waypoints = routes.map((route) => {
      return route.waypoints[0];
    });
  });
}

RoutesShowController.$inject = ['Route', '$state'];
function RoutesShowController(Route, $state) {
  const routesShow = this;

  routesShow.center = null;
  Route.get($state.params, (route) => {
    routesShow.route = route;
    routesShow.center = { lat: routesShow.route.waypoints[0].lat, lng: routesShow.route.waypoints[0].lng };
  });

  function deleteRoute() {
    routesShow.route.$remove(() => {
      $state.go('RoutesIndex');
    });
  }
  routesShow.delete = deleteRoute;
}

RoutesEditController.$inject = ['Route', '$state'];
function RoutesEditController(Route, $state) {
  const routesEdit = this;

  routesEdit.route = Route.get($state.params);

  function update() {
    routesEdit.route.$update(() => {
      $state.go('routesShow', $state.params);
    });
  }

  this.update = update;

}
