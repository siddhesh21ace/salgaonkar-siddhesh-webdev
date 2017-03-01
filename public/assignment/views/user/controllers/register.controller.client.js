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
                var promise = UserService.findUserByUsername(user.username);
                promise
                    .success(function () {
                        vm.error = "Sorry, this username is already taken.";
                    })
                    .error(function () {
                        UserService.createUser(user)
                            .success(function (user) {
                                $location.url('/user/' + user._id);
                            })
                            .error(function () {
                                vm.error = 'Err..something went wrong. Please try again.';
                            })
                    })
            } else {
                vm.error = 'Please enter all the details';
            }
        }
    }
})();