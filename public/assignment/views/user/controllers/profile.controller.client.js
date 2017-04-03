/**
 * Created by Siddhesh on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService, $location) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.update = update;
        vm.deleteUser = deleteUser;
        vm.logout = logout;

        function init() {
            UserService.findCurrentUser()
                .then(function(response) {
                    vm.user = response.data;
                });
        }

        init();

        function logout() {
            UserService.logout()
                .then(function (response) {
                    $location.url("/login");
                });
        }

        function update(updatedUser) {
            UserService.updateUser(vm.userID, updatedUser)
                .success(function (user) {
                    if (user === null) {
                        vm.error = "Unable to update user";
                    } else {
                        vm.message = "User successfully updated";
                    }
                })
                .error(function () {
                    vm.error = "Unable to update user";
                })
        }

        function deleteUser() {
            var answer = confirm("Are you sure?");
            if (answer) {
                UserService.deleteUser(vm.userID)
                    .success(function () {
                        $location.url("/login");
                    })
                    .error(function () {
                        vm.error = 'Unable to delete user';
                    });
            }
        }
    }
})();
