/**
 * Created by Siddhesh on 2/14/2017.
 */
(function () {
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

            PageService.findPageByWebsiteId(vm.websiteID)
                .success(function (pages) {
                    vm.pages = pages;
                });

            PageService.findPageById(vm.pageID)
                .success(function (page) {
                    vm.page = page;
                });
        }

        init();

        function deletePage() {
            var answer = confirm("Are you sure?");
            if (answer) {
                PageService.deletePage(vm.pageID)
                    .success(function () {
                        $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page");
                    })
                    .error(function () {
                        vm.error = 'Unable to delete page';
                    });
            }
        }

        function updatePage(updatedPage) {
            PageService.updatePage(vm.pageID, updatedPage)
                .success(function () {
                    vm.message = "Page successfully updated";
                    $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page");
                })
                .error(function () {
                    vm.error = "Unable to update page";
                });
        }
    }
})();