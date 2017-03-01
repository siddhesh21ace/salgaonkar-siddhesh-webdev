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

        function init() {
            UserService.findUserById(vm.userID)
                .success(function (user) {
                    vm.user = user;
                })
        }

        init();

        function update(updatedUser) {
            UserService.updateUser(vm.userID, updatedUser)
                .success(function (user) {
                    if (user == null) {
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
