angular.module('finalProject')
  .factory('Route', Route);

Route.$inject = ['$resource', 'API_URL'];
function Route($resource, API_URL) {
  return new $resource(`${API_URL}/routes/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
