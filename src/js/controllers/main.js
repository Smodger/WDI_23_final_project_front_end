
angular.module('finalProject')
  .controller('MainController', MainController);

MainController.$inject = ['$auth', '$state', '$rootScope'];
function MainController($auth, $state, $rootScope) {
  const main = this;

  main.isLoggedIn = $auth.isAuthenticated;

  function logout() {
    $auth.logout()
    .then(() => {
      $state.go('login');
    });
  }

  const protectedStates = ['usersEdit'];

  function secureState(e, toState, toParams) {

    if ($auth.isAuthenticated()) {
      main.currentUser = $auth.getPayload();
    }

    if((!$auth.isAuthenticated() &&
    protectedStates.includes(toState.name)) ||
    toState.name === 'usersEdit' && (parseFloat(toParams.id) !== $auth.getPayload().id)) {
      e.preventDefault();
      $state.go('login');
    }
  }
  $rootScope.$on('$stateChangeStart', secureState);

  main.logout = logout;

  main.getLocation = getLocation;
  function getLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        main.position = position;
        main.myLat = main.position.coords.latitude.toFixed(4);
        main.myLng = main.position.coords.longitude.toFixed(4);
        $('#longLat').append(`<h2> Latitude: ${main.myLat}, Longitude:  ${main.myLng}</h2>`);
      }.bind(main));
    } else {
      return 'Error in getting position';
    }
  }
}
