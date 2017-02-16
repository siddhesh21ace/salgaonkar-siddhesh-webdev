/**
 * Created by Siddhesh on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", newWebsiteController);

    function newWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userID);
        }
        init();

        function createWebsite (website) {
            WebsiteService.createWebsite(vm.userID, website);
            $location.url("/user/"+vm.userID+"/website");
        };
    }
})();