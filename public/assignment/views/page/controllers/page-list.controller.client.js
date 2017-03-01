/**
 * Created by Siddhesh on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", pageListController);

    function pageListController($routeParams, PageService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];

        function init() {
            PageService.findPageByWebsiteId(vm.websiteID)
                .success(function (pages) {
                    vm.pages = pages;
                })
        }

        init();
    }
})();
