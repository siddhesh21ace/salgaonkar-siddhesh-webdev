/**
 * Created by Siddhesh on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user) {
            if (user != undefined || user != null) {
                var userID = UserService.createUser(user);
                $location.url('/user/' + userID);
            } else {
                vm.error = 'Please enter all the details';
            }
        }
    }
})();