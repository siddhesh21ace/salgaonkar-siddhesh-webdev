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
            WebsiteService.findWebsitesByUser(vm.userID)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }
        init();
    }
})();
