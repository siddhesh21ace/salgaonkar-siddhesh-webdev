/**
 * Created by Siddhesh on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", editPageController);

    function editPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageID = $routeParams['pid'];
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteID);
            vm.page = PageService.findPageById(vm.pageID);
        }
        init();

        function deletePage () {
            PageService.deletePage(vm.pageID);
            $location.url("/user/"+vm.userID+"/website/"+vm.websiteID+"/page");
        };

        function updatePage (updatedPage) {
            var page = PageService.updatePage(vm.pageID, updatedPage);
            if(page == null) {
                vm.error = "Unable to update page";
            } else {
                vm.message = "Page successfully updated";
            }
            console.log(page);
        };
    }
})();