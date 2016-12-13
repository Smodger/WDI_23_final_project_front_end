angular.module('finalProject')
  .controller('UsersIndexController', UsersIndexController)
  .controller('UsersShowController', UsersShowController)
  .controller('UsersEditController', UsersEditController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User) {
  const usersIndex = this;

  usersIndex.all = User.query();
}

UsersShowController.$inject = ['User', '$state', '$auth'];
function UsersShowController(User, $state, $auth) {
  const usersShow = this;
  const currentUserId = $auth.getPayload().id;
  usersShow.editable = false;

// wait until data has been returned from db to run function allowUserToEdit.
  User.get($state.params).$promise.then((data) => {
    usersShow.user = data;
    allowUserToEdit();
  });

//prevent logged in user editing other users
  function allowUserToEdit() {
    // console.log('user to edit:', usersShow.user.id);
    // console.log('currentUser:', currentUserId);
    if (usersShow.user.id === currentUserId) {
      usersShow.editable = true;
    }
  }

  usersShow.allowUserToEdit = allowUserToEdit;

  function deleteUser() {
    usersShow.user.$remove(() => {
      $state.go('usersIndex');
    });
  }
  usersShow.delete = deleteUser;
}

UsersEditController.$inject = ['User', '$state'];
function UsersEditController(User, $state) {
  const usersEdit = this;

  usersEdit.user = User.get($state.params);

  function update() {
    usersEdit.user.$update(() => {
      $state.go('usersShow', $state.params);
    });
  }

  this.update = update;

}
