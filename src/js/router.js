angular.module('finalProject')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider'];
function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('usersIndex', {
      url: '/users',
      templateUrl: '/templates/usersIndex.html',
      controller: 'UsersIndexController as usersIndex'
    })
    .state('usersShow', {
      url: '/users/:id',
      templateUrl: '/templates/usersShow.html',
      controller: 'UsersShowController as usersShow'
    })
    .state('usersEdit', {
      url: '/users/:id/edit',
      templateUrl: '/templates/usersEdit.html',
      controller: 'UsersEditController as usersEdit'
    })
    .state('routesIndex', {
      url: '/routes',
      templateUrl: '/templates/routesIndex.html',
      controller: 'RoutesIndexController as routesIndex'
    })
    .state('routesShow', {
      url: '/routes/:id',
      templateUrl: '/templates/routesShow.html',
      controller: 'RoutesShowController as routesShow'
    })
    .state('routesNew', {
      url: '/routesNew',
      templateUrl: '/templates.routesNew.html',
      controller: 'RoutesNewController as routesNew'
    })
    .state('routesEdit', {
      url: '/routes/:id/edit',
      templateUrl: '/templates.routesEdit.html',
      controller: 'RoutesEditController as routesEdit'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/templates/register.html',
      controller: 'RegisterController as register'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'LoginController as login'
    });

  $urlRouterProvider.otherwise('/routes');
}
