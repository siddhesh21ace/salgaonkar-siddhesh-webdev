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

        vm.createTextInputWidget = createTextInputWidget;
        vm.createHeadingWidget = createHeadingWidget;
        vm.createHTMLWidget = createHTMLWidget;
        vm.createImageWidget = createImageWidget;
        vm.createYoutubeWidget = createYoutubeWidget;

        var widget = {};

        function createTextInputWidget() {
            widget = {
                type: "TEXT-INPUT",
                name: "Sample Text Input Widget",
                text: "Sample Text Input",
                rows: 1,
                placeholder: "Enter Text",
                formatted: false
            };
            createWidget(widget);
        }

        function createHeadingWidget() {
            widget = {
                type: "HEADING",
                name: "Sample Heading Widget",
                text: "Sample Heading",
                size: 1
            };
            createWidget(widget);
        }

        function createHTMLWidget() {
            widget = {
                type: "HTML",
                name: "Sample HTML Widget",
                text: "<p>Sample HTML</p>",
            };
            createWidget(widget);
        }

        function createImageWidget() {
            widget = {
                type: "IMAGE",
                name: "Sample Image Widget",
                width: "100%",
                url: "https://static.pexels.com/photos/198310/pexels-photo-198310.jpeg"
            };
            createWidget(widget);
        }

        function createYoutubeWidget() {
            widget = {
                type: "YOUTUBE",
                name: "Sample Youtube Widget",
                width: "100%",
                url: "https://youtu.be/HZdGwn0LcG0?list=PL_GGiAMracOWWJQm4LOBwG9BbGKzafcX9"
            };
            createWidget(widget);
        }

        function createWidget(dummyWidget) {
            WidgetService.createWidget(vm.pageID, dummyWidget)
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