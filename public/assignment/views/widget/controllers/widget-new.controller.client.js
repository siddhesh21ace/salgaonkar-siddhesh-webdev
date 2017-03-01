/**
 * Created by Siddhesh on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", newWidgetController);

    function newWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userID = $routeParams['uid'];
        vm.websiteID = $routeParams['wid'];
        vm.pageID = $routeParams['pid'];
        vm.createWidget = createWidget;

        function init() {
            vm.widgetTypes = ["Header", "HTML", "Image", "Youtube"];
        }

        init();

        function createWidget(widgetType) {
            WidgetService.createWidgetFromType(vm.pageID, widgetType)
                .success(function (widget) {
                    $location.url("/user/" + vm.userID + "/website/" + vm.websiteID +
                        "/page/" + vm.pageID + "/widget/" + widget._id);
                })
                .error(function () {
                    vm.error = 'Err..something went wrong. Please try again.';
                });
        }
    }
})();