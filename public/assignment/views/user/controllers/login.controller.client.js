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
                var promise = UserService.findUserByCredentials(user.username, user.password);
                promise
                    .success(function (user) {
                        var loginUser = user;
                        if (loginUser != null || loginUser != undefined) {
                            $location.url('/user/' + loginUser._id);
                        } else {
                            vm.error = 'User not found';
                        }
                    })
                    .error(function (err) {
                        vm.error = err;
                        console.log(err);
                    })
            } else {
                vm.error = 'Please enter correct credentials';
            }
        }
    }
})();