angular.module('finalProject')
  .factory('Waypoint', Waypoint);

Waypoint.$inject = ['$resource', 'API_URL'];
function Waypoint($resource, API_URL) {
  return new $resource(`${API_URL}/waypoints/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
