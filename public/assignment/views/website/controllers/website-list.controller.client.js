/**
 * Created by Siddhesh on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", websiteListController);

    function websiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userID = $routeParams['uid'];

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userID);
        }
        init();
    }
})();
