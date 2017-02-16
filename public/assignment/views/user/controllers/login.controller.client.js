/**
 * Created by Siddhesh on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if (user != undefined || user != null) {
                var loginUser = UserService.findUserByCredentials(user.username, user.password);
                if (loginUser != null) {
                    $location.url('/user/' + loginUser._id);
                } else {
                    vm.error = 'User not found';
                }
            } else {
                vm.error = 'Please enter correct credentials';
            }
        }
    }
})();