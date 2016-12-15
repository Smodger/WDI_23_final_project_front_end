angular.module('finalProject')
  .controller('RoutesIndexController', RoutesIndexController)
  .controller('RoutesNewController', RoutesNewController)
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

RoutesNewController.$inject = ['Route'];
function RoutesNewController(Route) {
  const routesNew = this;
  // const payload = $auth.getPayload();

  routesNew.route = {};
  routesNew.showmap=false;
  // routesNew.route.projectCreator = [payload._id];

  function create() {
    Route.save(routesNew.route, (route) => {
      console.log(route);
      routesNew.routeId = route.id;
      routesNew.showmap = true;
      // $state.go('routesIndex');
    });
  }

  routesNew.createRoute = create;
}


RoutesShowController.$inject = ['Route', '$state', '$auth'];
function RoutesShowController(Route, $state, $auth) {
  const routesShow = this;

  routesShow.switchEditState = false;

  routesShow.center = null;
  Route.get($state.params, (route) => {
    routesShow.route = route;
    routesShow.center = { lat: routesShow.route.waypoints[0].lat, lng: routesShow.route.waypoints[0].lng };

    if ($auth.isAuthenticated()) {
      const currentUserId = $auth.getPayload().id;
      routesShow.isCurrentUser = currentUserId === route.user.id;
    }

  });

  // let switchEditState = false;
  //
  // function toggleEdit() {
  //   console.log('In toggle edit!!');
  //   console.log(switchEditState);
  //   switchEditState = true;
  // }
  //
  // routesShow.toggleEdit = toggleEdit;

  function deleteRoute() {
    console.log('in function');
    routesShow.route.$remove(() => {
      $state.go('routesIndex');
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
      $state.reload();
    });
  }
  routesEdit.update = update;

}
