/**
 * Created by Siddhesh on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", editWebsiteController);

    function editWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService.findWebsitesByUser(vm.userID)
                .success(function (websites) {
                    vm.websites = websites;
                });
            WebsiteService.findWebsiteById(vm.websiteID)
                .success(function (website) {
                    vm.website = website;
                });
        }

        init();

        function deleteWebsite() {
            var answer = confirm("Are you sure?");
            if (answer) {
                WebsiteService.deleteWebsite(vm.websiteID)
                    .success(function () {
                        $location.url("/user/" + vm.userID + "/website");
                    })
                    .error(function () {
                        vm.error = 'Unable to delete website';
                    });
            }
        }

        function updateWebsite(updatedWebsite) {
            if(updatedWebsite && !updatedWebsite.name) {
                vm.missingName = true;
                return;
            }
            WebsiteService.updateWebsite(vm.websiteID, updatedWebsite)
                .success(function () {
                    vm.message = "Website successfully updated";
                    $location.url("/user/" + vm.userID + "/website");
                })
                .error(function () {
                    vm.error = "Unable to update website";
                });
        }
    }
})();