/**
 * Created by Siddhesh on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", newPageController);

    function newPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.createPage = createPage;

        function init() {
            PageService.findPageByWebsiteId(vm.websiteID)
                .success(function (pages) {
                    vm.pages = pages;
                })
        }

        init();

        function createPage(page) {
            if (page != null && page != undefined) {
                PageService.createPage(vm.websiteID, page)
                    .success(function (page) {
                        console.log(page);
                        $location.url("/user/" + vm.userID + "/website/" + vm.websiteID + "/page");
                    })
                    .error(function () {
                        vm.error = 'Err..something went wrong. Please try again.';
                    })
            } else {
                vm.error = "Please enter all the details";
            }
        }
    }
})();