/**
 * Created by Siddhesh on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", newWebsiteController);

    function newWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(vm.userID)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }

        init();

        function createWebsite(website) {
            if (website != null && website != undefined) {
                WebsiteService.createWebsite(vm.userID, website)
                    .success(function (website) {
                        console.log(website);
                        $location.url("/user/" + vm.userID + "/website");
                    })
                    .error(function () {
                        vm.error = 'Err..something went wrong. Please try again.';
                    });
            } else {
                vm.error = "Please enter all the details";
            }
        }
    }
})();