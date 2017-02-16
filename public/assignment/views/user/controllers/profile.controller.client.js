/**
 * Created by Siddhesh on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService, $location) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.update = update;
        vm.deleteUser = deleteUser;

        function init() {
            vm.user = UserService.findUserById(vm.userID);
        }
        init();

        function update (updatedUser) {
            var user = UserService.updateUser(vm.userID, updatedUser);
            if(user == null) {
                vm.error = "Unable to update user";
            } else {
                vm.message = "User successfully updated";
            }
        }

        function deleteUser() {
            UserService.deleteUser(vm.userID);
            $location.url("/login");
        }
    }
})();
