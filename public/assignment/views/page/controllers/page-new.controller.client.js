/**
 * Created by Siddhesh on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewPageController", newPageController);

    function newPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteID);
        }
        init();

        function createPage (page) {
            PageService.createPage(vm.websiteID, page);
            $location.url("/user/"+vm.userID+"/website/"+vm.websiteID+"/page");
        };
    }
})();