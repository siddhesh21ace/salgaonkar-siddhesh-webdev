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
            if (user) {
                UserService.register(user)
                    .then(function (response) {
                            var user = response.data;
                            $location.url("/user/" + user._id);
                        },
                        function (error) {
                            vm.error = error.data;
                        });
            } else {
                vm.error = 'Please enter all the details';
            }
        }
    }
})();