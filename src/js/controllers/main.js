
angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope'];
function MainController($auth, $state, $rootScope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;
  main.currentUser = $auth.getPayload();

  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('login');
    });
  }

  const protectedStates = ['usersEdit'];

  function secureState(e, toState, toParams) {

    if((!$auth.isAuthenticated() &&
    protectedStates.includes(toState.name)) ||
    toState.name === 'usersEdit' && (parseFloat(toParams.id) !== $auth.getPayload().id)) {
      e.preventDefault();
      $state.go('login');
    }
  }
  $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;
}
