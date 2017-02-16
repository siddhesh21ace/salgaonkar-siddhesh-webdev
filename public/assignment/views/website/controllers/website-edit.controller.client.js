/**
 * Created by Siddhesh on 2/14/2017.
 */
(function(){
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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userID);
            vm.website = WebsiteService.findWebsiteById(vm.websiteID);
        }
        init();

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteID);
            $location.url("/user/"+vm.userID+"/website");
        }

        function updateWebsite (updatedWebsite) {
            var website = WebsiteService.updateWebsite(vm.websiteID, updatedWebsite);
            if(website == null) {
                vm.error = "Unable to update website";
            } else {
                vm.message = "Website successfully updated";
            }
            console.log(website);
        }
    }
})();