/**
 * Created by Siddhesh on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", profileController);

    function profileController($routeParams, UserService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.update = update;

        function init() {
            var user = UserService.findUserById(vm.userID);
            vm.user = user;
        }
        init();

        function update (updatedUser) {
            var user = UserService.updateUser(vm.userID, updatedUser);
            if(user == null) {
                vm.error = "Unable to update user";
            } else {
                vm.message = "User successfully updated";
            }
        };
    }
})();
